import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

export const env = {
  appId: required("APP_ID"),
  appSecret: required("APP_SECRET"),
  isProduction: process.env.NODE_ENV === "production",
  appUrl: process.env.APP_URL || "http://localhost:3000",
  databaseUrl: required("DATABASE_URL"),
  oauthAuthUrl: required("OAUTH_AUTH_URL"),
  oauthApiUrl: required("OAUTH_API_URL"),
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  stripePriceCurrency: process.env.STRIPE_PRICE_CURRENCY || "usd",
  awsRegion: process.env.AWS_REGION ?? "",
  awsBucketName: process.env.AWS_BUCKET_NAME ?? "",
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  ownerUnionId: process.env.OWNER_UNION_ID ?? "",
};
