import { authRouter } from "./auth-router.js";
import { contactRouter } from "./contact-router.js";
import { messageRouter } from "./message-router.js";
import { newsletterRouter } from "./newsletter-router.js";
import { adminRouter } from "./admin-router.js";
import { paymentRouter } from "./payment-router.js";
import { libraryRouter } from "./library-router.js";
import { reviewRouter } from "./review-router.js";
import { createRouter, publicQuery } from "./middleware.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  contact: contactRouter,
  message: messageRouter,
  newsletter: newsletterRouter,
  admin: adminRouter,
  payment: paymentRouter,
  library: libraryRouter,
  review: reviewRouter,
});

export type AppRouter = typeof appRouter;
