import { date, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"])
export const ROLES_ENUM = pgEnum("roles", ["ADMIN", "USER"])
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", ['BORROWED', "RETURNED", "OVERDUE"])


export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING").notNull(),
  role: ROLES_ENUM("role").default("USER").notNull(),
  lastActivityDate: date("last_activity_date").defaultNow().notNull(),
  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "string",
    withTimezone: true,
  }).defaultNow().$onUpdate(() => new Date().toISOString()).notNull(),
})