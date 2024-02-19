import { db } from "$lib/server/db";
import { todos } from "$lib/server/db/schema";
import type { RequestEvent } from "./$types";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { error } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";

export async function load() {
	return {
		todos: await db.select().from(todos).orderBy(desc(todos.id)).all(),
	};
}

export const actions = {
	addTodo: async ({ request }: RequestEvent) => {
		const schema = zfd.formData({
			todo: zfd.text(z.string().min(1)),
		});

		const result = schema.safeParse(await request.formData());

		if (!result.success) {
			error(422, "Invalid data");
		}

		await db.insert(todos).values({ text: result.data.todo });

		return { success: true };
	},

	removeTodo: async ({ request }: RequestEvent) => {
		const schema = zfd.formData({
			id: zfd.numeric(),
		});

		const result = schema.safeParse(await request.formData());

		if (!result.success) {
			error(422, "Invalid data");
		}

		const deleted = await db
			.delete(todos)
			.where(eq(todos.id, result.data.id))
			.returning();

		if (!deleted.length) {
			error(404, "Not found");
		}

		return { success: true };
	},

	toggleTodo: async ({ request }: RequestEvent) => {
		const schema = zfd.formData({
			id: zfd.numeric(),
			completed: zfd.checkbox(),
		});

		const result = schema.safeParse(await request.formData());

		if (!result.success) {
			error(422, "Invalid data");
		}

		const updated = await db
			.update(todos)
			.set({ completed: !result.data.completed })
			.where(eq(todos.id, result.data.id))
			.returning();

		if (!updated.length) {
			error(404, "Not found");
		}

		return { success: true };
	},
};
