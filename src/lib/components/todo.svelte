<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button";
	import { Trash2, CheckSquare, Square, Loader2 } from "lucide-svelte";
	import { useLoader } from "$lib/hooks/useLoader.svelte";
	import { default as Form } from "./form.svelte";
	import { removeTodoSchema, toggleTodoSchema } from "$lib/schemas";
	import {
		type Infer,
		superForm,
		type SuperValidated,
	} from "sveltekit-superforms";

	type Props = {
		id: number;
		completed: boolean;
		text: string;
		toggleTodoForm: SuperValidated<Infer<typeof toggleTodoSchema>>;
		removeTodoForm: SuperValidated<Infer<typeof removeTodoSchema>>;
	};

	const { id, completed, text, toggleTodoForm, removeTodoForm } =
		$props<Props>();

	const loader = useLoader();

	const { enhance: toggleTodoEnhance } = superForm(toggleTodoForm, {
		onSubmit: () => loader.start(),
		onResult: () => loader.stop(),
	});

	const { enhance: removeTodoEnhance } = superForm(removeTodoForm, {
		onSubmit: () => loader.start(),
		onResult: () => loader.stop(),
	});
</script>

<li class="relative flex rounded border px-3 py-2">
	<form
		class="flex flex-1 flex-row items-center gap-2"
		method="POST"
		action="/?/toggleTodo"
		use:toggleTodoEnhance
	>
		<input type="hidden" name="id" value={id} />
		<input
			type="checkbox"
			checked={completed}
			name="completed"
			class="hidden"
			readonly
		/>
		<button
			type="submit"
			class={cn(
				"flex flex-1 cursor-pointer items-center gap-2",
				completed && "text-muted-foreground line-through",
			)}
			title="Toggle completed status"
			disabled={loader.isLoading}
		>
			{#if completed}
				<CheckSquare />
			{:else}
				<Square />
			{/if}
			<span>{text}</span>
		</button>
	</form>
	<Form
		method="POST"
		action="/?/removeTodo"
		data={removeTodoForm}
		let:form
		let:message
	>
		<pre>{JSON.stringify({ form, message })}</pre>
	</Form>
	<form method="POST" action="/?/removeTodo" use:removeTodoEnhance>
		<input type="hidden" name="id" value={id} />
		<Button type="submit" disabled={loader.isLoading} title="Delete todo">
			<Trash2 class="h-4 w-4" />
		</Button>
	</form>
	{#if loader.isLoading}
		<div
			class="absolute inset-0 flex flex-1 items-center justify-center backdrop-blur-sm"
		>
			<Loader2 class="animate-spin" />
		</div>
	{/if}
</li>
