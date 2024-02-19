import { z } from "zod";

export const addTodoSchema = z.object({
	todo: z.string().min(1),
});

export const removeTodoSchema = z.object({
	id: z.number(),
});

export const toggleTodoSchema = z.object({
	id: z.number(),
	completed: z.boolean(),
});

export type AddTodoSchema = z.infer<typeof addTodoSchema>;

export type ToggleTodoSchema = z.infer<typeof toggleTodoSchema>;

export type RemoveTodoSchema = z.infer<typeof removeTodoSchema>;
