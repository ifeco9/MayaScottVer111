import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { booksCatalog, reviews } from "../db/schema.js";
import { createRouter, adminQuery, authedQuery, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";

const reviewInput = z.object({
  bookSlug: z.string().min(1).max(255),
  bookTitle: z.string().min(1).max(255),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(255).optional(),
  content: z.string().min(10).max(2000),
});

export const reviewRouter = createRouter({
  listByBook: publicQuery
    .input(z.object({ bookSlug: z.string().min(1).max(255) }))
    .query(async ({ input }) => {
      const db = getDb();
      const [book] = await db
        .select()
        .from(booksCatalog)
        .where(eq(booksCatalog.slug, input.bookSlug))
        .limit(1);
      if (!book) return [];

      return db
        .select()
        .from(reviews)
        .where(and(eq(reviews.bookId, book.id), eq(reviews.status, "published")))
        .orderBy(desc(reviews.createdAt));
    }),

  listMine: authedQuery.query(async ({ ctx }) => {
    return getDb()
      .select()
      .from(reviews)
      .where(eq(reviews.userId, ctx.user.id))
      .orderBy(desc(reviews.createdAt));
  }),

  create: authedQuery.input(reviewInput).mutation(async ({ ctx, input }) => {
    const db = getDb();
    let [book] = await db
      .select()
      .from(booksCatalog)
      .where(eq(booksCatalog.slug, input.bookSlug))
      .limit(1);

    if (!book) {
      const created = await db.insert(booksCatalog).values({
        slug: input.bookSlug,
        title: input.bookTitle,
        priceCents: 799,
        currency: "USD",
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
        message: "Unable to resolve review target book.",
      });
    }

    await db
      .insert(reviews)
      .values({
        userId: ctx.user.id,
        bookId: book.id,
        rating: input.rating,
        title: input.title,
        content: input.content,
        status: "pending",
      })
      .onDuplicateKeyUpdate({
        set: {
          rating: input.rating,
          title: input.title,
          content: input.content,
          status: "pending",
        },
      });

    return { ok: true };
  }),

  moderate: adminQuery
    .input(
      z.object({
        reviewId: z.number().int().positive(),
        status: z.enum(["published", "rejected"]),
      }),
    )
    .mutation(async ({ input }) => {
      await getDb()
        .update(reviews)
        .set({ status: input.status })
        .where(eq(reviews.id, input.reviewId));
      return { ok: true };
    }),

  listPending: adminQuery.query(async () => {
    return getDb()
      .select()
      .from(reviews)
      .where(eq(reviews.status, "pending"))
      .orderBy(desc(reviews.createdAt));
  }),
});
