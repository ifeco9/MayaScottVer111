import type { Context } from "hono";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { entitlements, orderItems, orders, payments } from "../db/schema.js";
import { env } from "./lib/env.js";
import { getDb } from "./queries/connection.js";

const stripe = env.stripeSecretKey ? new Stripe(env.stripeSecretKey) : null;

async function fulfillOrder(orderId: number, eventId?: string) {
  const db = getDb();
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) return;

  await db
    .update(orders)
    .set({ status: "paid" })
    .where(eq(orders.id, orderId));

  await db
    .update(payments)
    .set({ status: "succeeded", stripeEventId: eventId })
    .where(eq(payments.orderId, orderId));

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  for (const item of items) {
    await db
      .insert(entitlements)
      .values({
        userId: order.userId,
        bookId: item.bookId,
        orderId: order.id,
      })
      .onDuplicateKeyUpdate({ set: { isActive: true } });
  }
}

export function createStripeWebhookHandler() {
  return async (c: Context) => {
    if (!stripe || !env.stripeWebhookSecret) {
      return c.json({ error: "Stripe webhook is not configured." }, 503);
    }

    const sig = c.req.header("stripe-signature");
    if (!sig) {
      return c.json({ error: "Missing Stripe signature." }, 400);
    }

    const payload = await c.req.raw.text();
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        env.stripeWebhookSecret,
      );
    } catch (error) {
      return c.json({ error: "Invalid webhook signature.", detail: String(error) }, 400);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = Number(session.metadata?.orderId);
      if (Number.isFinite(orderId) && orderId > 0) {
        await fulfillOrder(orderId, event.id);
      }
    }

    return c.json({ received: true });
  };
}
