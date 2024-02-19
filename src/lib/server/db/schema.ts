import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
	id: integer("id").primaryKey(),
	text: text("text").notNull(),
	completed: integer("completed", { mode: "boolean" }).notNull().default(false),
});

export type Todo = typeof todos.$inferSelect;
