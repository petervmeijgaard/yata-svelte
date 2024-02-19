import { db } from "$lib/server/db";
import { todos } from "$lib/server/db/schema";
import type { RequestEvent } from "./$types";
import { zfd } from "zod-form-data";
import { error, fail } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import {
	addTodoSchema,
	removeTodoSchema,
	toggleTodoSchema,
} from "$lib/schemas";

export async function load() {
	const addTodoForm = await superValidate(zod(addTodoSchema));
	const removeTodoForm = await superValidate(zod(removeTodoSchema));
	const toggleTodoForm = await superValidate(zod(toggleTodoSchema));

	const dbTodos = await db.select().from(todos).orderBy(desc(todos.id)).all();

	return {
		addTodoForm,
		removeTodoForm,
		toggleTodoForm,
		todos: dbTodos,
	};
}

export const actions = {
	addTodo: async ({ request }: RequestEvent) => {
		const addTodoForm = await superValidate(request, zod(addTodoSchema));

		if (!addTodoForm.valid) {
			return fail(422, { addTodoForm });
		}

		await db.insert(todos).values({ text: addTodoForm.data.todo });

		return message(addTodoForm, "Todo added");
	},

	toggleTodo: async ({ request }: RequestEvent) => {
		const toggleTodoForm = await superValidate(request, zod(toggleTodoSchema));

		if (!toggleTodoForm.valid) {
			return fail(422, { toggleTodoForm });
		}

		const updated = await db
			.update(todos)
			.set({ completed: !toggleTodoForm.data.completed })
			.where(eq(todos.id, toggleTodoForm.data.id))
			.returning();

		if (!updated.length) {
			error(404, "Not found");
		}

		return message(toggleTodoForm, "Todo updated");
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
};
