import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import Stripe from "stripe";
import { z } from "zod";
import {
  booksCatalog,
  entitlements,
  orderItems,
  orders,
  payments,
} from "../db/schema.js";
import { createRouter, authedQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { env } from "./lib/env.js";

const createCheckoutInput = z.object({
  bookSlug: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
  coverUrl: z.string().url().optional(),
  priceCents: z.number().int().positive(),
  successPath: z.string().default("/library"),
  cancelPath: z.string().default("/books"),
});

function getStripeClient() {
  if (!env.stripeSecretKey) return null;
  return new Stripe(env.stripeSecretKey);
}

export const paymentRouter = createRouter({
  createCheckout: authedQuery
    .input(createCheckoutInput)
    .mutation(async ({ ctx, input }) => {
      const db = getDb();

      let [book] = await db
        .select()
        .from(booksCatalog)
        .where(eq(booksCatalog.slug, input.bookSlug))
        .limit(1);

      if (!book) {
        const created = await db.insert(booksCatalog).values({
          slug: input.bookSlug,
          title: input.title,
          coverUrl: input.coverUrl,
          description: null,
          priceCents: input.priceCents,
          currency: env.stripePriceCurrency.toUpperCase(),
          fileKey: `${input.bookSlug}.pdf`,
        });
        [book] = await db
          .select()
          .from(booksCatalog)
          .where(eq(booksCatalog.id, created[0].insertId))
          .limit(1);
      }

      if (!book) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to resolve book catalog record.",
        });
      }

      const orderResult = await db.insert(orders).values({
        userId: ctx.user.id,
        totalCents: input.priceCents,
        currency: env.stripePriceCurrency.toUpperCase(),
      });
      const orderId = orderResult[0].insertId;

      await db.insert(orderItems).values({
        orderId,
        bookId: book.id,
        unitPriceCents: input.priceCents,
        quantity: 1,
      });

      const stripe = getStripeClient();
      if (!stripe) {
        await db.insert(payments).values({
          orderId,
          provider: "stripe",
          status: "pending",
          amountCents: input.priceCents,
          currency: env.stripePriceCurrency.toUpperCase(),
        });

        return {
          checkoutUrl: `${env.appUrl}/checkout?payment=success&orderId=${orderId}`,
          orderId,
          mode: "mock" as const,
        };
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: ctx.user.email || undefined,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: env.stripePriceCurrency,
              unit_amount: input.priceCents,
              product_data: {
                name: input.title,
                images: input.coverUrl ? [input.coverUrl] : undefined,
              },
            },
          },
        ],
        metadata: {
          orderId: String(orderId),
          bookId: String(book.id),
          userId: String(ctx.user.id),
          bookSlug: book.slug,
        },
        success_url: `${env.appUrl}${input.successPath}?payment=success&orderId=${orderId}`,
        cancel_url: `${env.appUrl}${input.cancelPath}?payment=cancelled&orderId=${orderId}`,
      });

      await db
        .update(orders)
        .set({ stripeCheckoutSessionId: session.id })
        .where(eq(orders.id, orderId));

      await db.insert(payments).values({
        orderId,
        provider: "stripe",
        status: "pending",
        amountCents: input.priceCents,
        currency: env.stripePriceCurrency.toUpperCase(),
      });

      return {
        checkoutUrl: session.url,
        orderId,
        mode: "stripe" as const,
      };
    }),

  markMockPaid: authedQuery
    .input(z.object({ orderId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [order] = await db
        .select()
        .from(orders)
        .where(and(eq(orders.id, input.orderId), eq(orders.userId, ctx.user.id)))
        .limit(1);
      if (!order) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found." });
      }

      await db.update(orders).set({ status: "paid" }).where(eq(orders.id, order.id));
      await db
        .update(payments)
        .set({ status: "succeeded" })
        .where(eq(payments.orderId, order.id));

      const items = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));

      for (const item of items) {
        await db
          .insert(entitlements)
          .values({
            userId: ctx.user.id,
            bookId: item.bookId,
            orderId: order.id,
          })
          .onDuplicateKeyUpdate({
            set: { isActive: true },
          });
      }

      return { ok: true };
    }),
});
