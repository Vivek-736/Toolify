import { integer, pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
});

export const chatsTable = pgTable("chats", {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: integer("user_id").references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    preview: text("preview"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messagesTable = pgTable("messages", {
    id: varchar("id", { length: 36 }).primaryKey(),
    chatId: varchar("chat_id", { length: 36 }).references(() => chatsTable.id, { onDelete: 'cascade' }).notNull(),
    role: varchar("role", { length: 20 }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});