import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  boolean,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

// Users table (managed by auth system)
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Contact form submissions
export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

// Message board posts
export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).default("General"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

// Newsletter subscribers
export const subscribers = mysqlTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

export const booksCatalog = mysqlTable("booksCatalog", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  coverUrl: text("coverUrl"),
  priceCents: int("priceCents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  fileKey: text("fileKey").notNull(),
  previewKey: text("previewKey"),
  isPublished: boolean("isPublished").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type BookCatalog = typeof booksCatalog.$inferSelect;
export type InsertBookCatalog = typeof booksCatalog.$inferInsert;

export const orderStatusEnum = mysqlEnum("orderStatus", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  userId: int("userId").notNull(),
  status: orderStatusEnum.default("pending").notNull(),
  totalCents: int("totalCents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

export const orderItems = mysqlTable("orderItems", {
  id: serial("id").primaryKey(),
  orderId: int("orderId").notNull(),
  bookId: int("bookId").notNull(),
  unitPriceCents: int("unitPriceCents").notNull(),
  quantity: int("quantity").notNull().default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

export const paymentStatusEnum = mysqlEnum("paymentStatus", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
]);

export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  orderId: int("orderId").notNull(),
  provider: varchar("provider", { length: 50 }).notNull().default("stripe"),
  status: paymentStatusEnum.default("pending").notNull(),
  amountCents: int("amountCents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  stripeEventId: varchar("stripeEventId", { length: 255 }),
  failureReason: text("failureReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

export const entitlements = mysqlTable(
  "entitlements",
  {
    id: serial("id").primaryKey(),
    userId: int("userId").notNull(),
    bookId: int("bookId").notNull(),
    orderId: int("orderId").notNull(),
    isActive: boolean("isActive").notNull().default(true),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    userBookUnique: uniqueIndex("user_book_entitlement_unique").on(
      table.userId,
      table.bookId,
    ),
  }),
);

export type Entitlement = typeof entitlements.$inferSelect;
export type InsertEntitlement = typeof entitlements.$inferInsert;

export const reviewStatusEnum = mysqlEnum("reviewStatus", [
  "pending",
  "published",
  "rejected",
]);

export const reviews = mysqlTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    userId: int("userId").notNull(),
    bookId: int("bookId").notNull(),
    rating: int("rating").notNull(),
    title: varchar("title", { length: 255 }),
    content: text("content").notNull(),
    status: reviewStatusEnum.notNull().default("pending"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    userBookReviewUnique: uniqueIndex("user_book_review_unique").on(
      table.userId,
      table.bookId,
    ),
  }),
);

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;
