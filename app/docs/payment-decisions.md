# Payment Decisions (Phase 1)

This implementation uses the following defaults:

- Checkout type: Stripe hosted checkout session.
- Markets: US, UK, Canada, Australia, Germany.
- Tax approach: external tax handling to be enabled in Stripe dashboard (manual rates/Stripe Tax).
- Refund handling: manual refunds in Stripe dashboard with entitlement revocation as follow-up ops task.
- Compliance pages: `Privacy Policy` and `Terms of Use` routes are available in the footer.

Notes:

- In local development, when `STRIPE_SECRET_KEY` is missing, checkout falls back to a mock success flow.
- In production, configure `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` for live verification.
