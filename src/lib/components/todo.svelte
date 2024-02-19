<script lang="ts">
	import type { SubmitFunction } from "@sveltejs/kit";
	import { enhance } from "$app/forms";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button";
	import { Trash2, CheckSquare, Square, Loader2 } from "lucide-svelte";

	type Props = {
		id: number;
		completed: boolean;
		text: string;
	};

	const { id, completed, text } = $props<Props>();

	let loading = $state(false);

	const submitForm: SubmitFunction = () => {
		loading = true;

		return async ({ update }) => {
			loading = false;

			await update();
		};
	};
</script>

<li class="relative flex rounded border px-3 py-2">
	<form
		class="flex flex-1 flex-row items-center gap-2"
		method="POST"
		action="/?/toggleTodo"
		use:enhance={submitForm}
	>
		<input type="hidden" name="id" value={id} />
		<input
			type="checkbox"
			checked={completed}
			name="completed"
			class="sr-only"
			readonly
		/>
		<button
			type="submit"
			class={cn(
				"flex flex-1 cursor-pointer items-center gap-2",
				completed && "text-muted-foreground line-through",
			)}
			disabled={loading}
		>
			{#if completed}
				<CheckSquare />
			{:else}
				<Square />
			{/if}
			<span>{text}</span>
		</button>
	</form>
	<form method="POST" action="/?/removeTodo" use:enhance={submitForm}>
		<input type="hidden" name="id" value={id} />
		<Button type="submit" disabled={loading}>
			<Trash2 class="h-4 w-4" />
		</Button>
	</form>
	{#if loading}
		<div
			class="absolute inset-0 flex flex-1 items-center justify-center backdrop-blur-sm"
		>
			<Loader2 class="animate-spin" />
		</div>
	{/if}
</li>
