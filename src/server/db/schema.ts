// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferSelectModel, sql } from "drizzle-orm";
import {
  index,
  integer,
  numeric,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// использую nest-gallery как префикс для DB таблиц. Таким образом я могу создать одну DB на верселе и использовать ее для нескольких проектов, так как таблицы будут разделены по префиксу.
export const createTable = pgTableCreator((name) => `nest-gallery_${name}`);

export const images = createTable(
  "images",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),

    userId: varchar("userId", { length: 256 }).notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
    urlIndex: index("url_idx").on(example.url),
  }),
);

// export type RolePrivilege = InferModel<typeof rolePrivileges>;
// export type ImagesType = InferSelectModel<typeof images>;
export type ImagesType = typeof images.$inferSelect;

// import { serial, text, pgTable } from "drizzle-orm/pg-core";
// import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
// const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
// });
// type SelectUser = typeof users.$inferSelect;
// type InsertUser = typeof users.$inferInsert;
// // or
// type SelectUser = typeof users._.$inferSelect;
// type InsertUser = typeof users._.$inferInsert;
// // or
// type SelectUser = InferSelectModel<typeof users>;
// type InsertUser = InferInsertModel<typeof users>;
