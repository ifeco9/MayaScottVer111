import { relations } from "drizzle-orm";
import {
  booksCatalog,
  entitlements,
  orderItems,
  orders,
  payments,
  reviews,
  users,
} from "./schema.js";

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  entitlements: many(entitlements),
  reviews: many(reviews),
}));

export const booksCatalogRelations = relations(booksCatalog, ({ many }) => ({
  orderItems: many(orderItems),
  entitlements: many(entitlements),
  reviews: many(reviews),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
  payments: many(payments),
  entitlements: many(entitlements),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  book: one(booksCatalog, {
    fields: [orderItems.bookId],
    references: [booksCatalog.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

export const entitlementsRelations = relations(entitlements, ({ one }) => ({
  user: one(users, {
    fields: [entitlements.userId],
    references: [users.id],
  }),
  book: one(booksCatalog, {
    fields: [entitlements.bookId],
    references: [booksCatalog.id],
  }),
  order: one(orders, {
    fields: [entitlements.orderId],
    references: [orders.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  book: one(booksCatalog, {
    fields: [reviews.bookId],
    references: [booksCatalog.id],
  }),
}));
