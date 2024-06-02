import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: varchar("email", { length: 250 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (users) => ({
    uniqueIndex: uniqueIndex("unique_idx").on(users.email),
  })
);
