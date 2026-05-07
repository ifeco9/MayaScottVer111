import { z } from "zod";
import { createRouter, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { subscribers } from "../db/schema.js";

export const newsletterRouter = createRouter({
  subscribe: publicQuery
    .input(
      z.object({
        email: z.string().email("Invalid email").max(320),
      })
    )
    .mutation(async ({ input }) => {
      await getDb()
        .insert(subscribers)
        .values({ email: input.email })
        .onDuplicateKeyUpdate({ set: { email: input.email } });
      return { success: true };
    }),
});
