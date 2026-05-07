import { z } from "zod";
import { createRouter, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { contacts } from "../db/schema.js";
import { desc } from "drizzle-orm";

export const contactRouter = createRouter({
  send: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required").max(255),
        email: z.string().email("Invalid email").max(320),
        subject: z.string().max(255).optional(),
        message: z.string().min(1, "Message is required"),
      })
    )
    .mutation(async ({ input }) => {
      await getDb().insert(contacts).values({
        name: input.name,
        email: input.email,
        subject: input.subject || null,
        message: input.message,
      });
      return { success: true };
    }),

  list: publicQuery.query(async () => {
    return getDb().select().from(contacts).orderBy(desc(contacts.createdAt));
  }),
});
