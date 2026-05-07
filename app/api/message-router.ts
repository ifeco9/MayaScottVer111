import { z } from "zod";
import { createRouter, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { messages } from "../db/schema.js";
import { desc } from "drizzle-orm";

export const messageRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required").max(255),
        email: z.string().email("Invalid email").max(320),
        content: z.string().min(1, "Content is required"),
        category: z.string().max(100).optional(),
      })
    )
    .mutation(async ({ input }) => {
      await getDb().insert(messages).values({
        name: input.name,
        email: input.email,
        content: input.content,
        category: input.category || "General",
      });
      return { success: true };
    }),

  list: publicQuery.query(async () => {
    return getDb().select().from(messages).orderBy(desc(messages.createdAt));
  }),
});
