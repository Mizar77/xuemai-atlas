import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const feedback = sqliteTable("feedback", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  publicId: text("public_id").notNull().unique(),
  feedbackType: text("feedback_type", {
    enum: ["correction", "add_person", "add_relation", "career_update", "source", "other"],
  }).notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  sourceUrl: text("source_url"),
  submitterName: text("submitter_name"),
  contact: text("contact"),
  context: text("context"),
  status: text("status", { enum: ["pending", "reviewing", "accepted", "declined"] }).notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("idx_feedback_status_created_at").on(table.status, table.createdAt),
]);

export const visitorCountryCounts = sqliteTable("visitor_country_counts", {
  countryCode: text("country_code").primaryKey(),
  visits: integer("visits").notNull().default(0),
  firstSeenAt: text("first_seen_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  lastSeenAt: text("last_seen_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("idx_visitor_country_visits").on(table.visits),
]);
