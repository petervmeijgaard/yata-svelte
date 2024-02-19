<script lang="ts">
	import type { SubmitFunction } from "@sveltejs/kit";
	import { enhance } from "$app/forms";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button";
	import { Trash2, CheckSquare, Square, Loader2 } from "lucide-svelte";
	import { useLoader } from "$lib/hooks/useLoader.svelte";

	type Props = {
		id: number;
		completed: boolean;
		text: string;
	};

	const { id, completed, text } = $props<Props>();

	const loader = useLoader();

	const submitForm: SubmitFunction = () => {
		loader.start();

		return async ({ update }) => {
			await update();

			loader.stop();
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
	<form method="POST" action="/?/removeTodo" use:enhance={submitForm}>
		<input type="hidden" name="id" value={id} />
		<Button type="submit" disabled={loader.isLoading}>
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
