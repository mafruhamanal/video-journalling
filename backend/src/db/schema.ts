import { sqliteTable } from "drizzle-orm/sqlite-core"
import * as t from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';

export const users = sqliteTable(
  "users",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    firstName: t.text("first_name"),
    lastName: t.text("last_name"),
    email: t.text().notNull(),
  }
);

export const usersRelations = relations(users, ({ many }) => ({
	videos: many(videos),
}));

export const videos = sqliteTable(
  "videos",
  {
    id: t.int().primaryKey({ autoIncrement: true}),
    authorId: t.int("author_id").notNull(),
    title: t.text().notNull(),
    description: t.text(),
    hlsPath: t.text("hls_path"),
    thumbnailPath: t.text("thumbnail_path"),
    status: t.text().$type<"processing" | "ready" | "failed">(),
    duration: t.int(),
    createdAt: t.int("created_at").notNull().$default(Date.now),
  }
)

export const videoRelations = relations(videos, ({ one }) => ({
	author: one(users, { fields: [videos.authorId], references: [users.id] }),
}));