import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { booksCatalog, entitlements, orders } from "../db/schema.js";
import { createRouter, authedQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { env } from "./lib/env.js";

function buildS3Client() {
  if (
    !env.awsRegion ||
    !env.awsAccessKeyId ||
    !env.awsSecretAccessKey ||
    !env.awsBucketName
  ) {
    return null;
  }
  return new S3Client({
    region: env.awsRegion,
    credentials: {
      accessKeyId: env.awsAccessKeyId,
      secretAccessKey: env.awsSecretAccessKey,
    },
  });
}

export const libraryRouter = createRouter({
  myBooks: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const owned = await db
      .select({
        entitlementId: entitlements.id,
        bookId: booksCatalog.id,
        slug: booksCatalog.slug,
        title: booksCatalog.title,
        coverUrl: booksCatalog.coverUrl,
        description: booksCatalog.description,
        fileKey: booksCatalog.fileKey,
        purchasedAt: entitlements.createdAt,
      })
      .from(entitlements)
      .innerJoin(booksCatalog, eq(entitlements.bookId, booksCatalog.id))
      .innerJoin(orders, eq(entitlements.orderId, orders.id))
      .where(
        and(
          eq(entitlements.userId, ctx.user.id),
          eq(entitlements.isActive, true),
          eq(orders.status, "paid"),
        ),
      )
      .orderBy(desc(entitlements.createdAt));

    return owned;
  }),

  getAccessUrl: authedQuery
    .input(z.object({ bookId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [owned] = await db
        .select({
          fileKey: booksCatalog.fileKey,
        })
        .from(entitlements)
        .innerJoin(booksCatalog, eq(entitlements.bookId, booksCatalog.id))
        .innerJoin(orders, eq(entitlements.orderId, orders.id))
        .where(
          and(
            eq(entitlements.userId, ctx.user.id),
            eq(entitlements.bookId, input.bookId),
            eq(entitlements.isActive, true),
            eq(orders.status, "paid"),
          ),
        )
        .limit(1);

      if (!owned) {
        return { url: null, mode: "none" as const };
      }

      const s3 = buildS3Client();
      if (!s3) {
        return {
          url: `/samples/${owned.fileKey}`,
          mode: "local" as const,
        };
      }

      const command = new GetObjectCommand({
        Bucket: env.awsBucketName,
        Key: owned.fileKey,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 60 * 15 });
      return { url, mode: "signed" as const };
    }),
});
