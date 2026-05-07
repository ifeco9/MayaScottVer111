import { createRouter, adminQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { contacts, messages, reviews } from "../db/schema.js";
import { desc, eq } from "drizzle-orm";

export const adminRouter = createRouter({
  listContacts: adminQuery.query(async () => {
    return getDb().select().from(contacts).orderBy(desc(contacts.createdAt));
  }),

  listMessages: adminQuery.query(async () => {
    return getDb().select().from(messages).orderBy(desc(messages.createdAt));
  }),

  listPendingReviews: adminQuery.query(async () => {
    return getDb()
      .select()
      .from(reviews)
      .where(eq(reviews.status, "pending"))
      .orderBy(desc(reviews.createdAt));
  }),
});
