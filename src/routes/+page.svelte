<script lang="ts">
	import { useTodos } from "$lib/useTodos.svelte";
	import { cn } from "$lib/cn";
	import { Trash2 } from "lucide-svelte";

	const { todos, addTodo, removeTodo, toggleTodo } = useTodos();

	let input = $state("");

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!input) return;

		addTodo(input);

		input = "";
	}
</script>

<svelte:head>
	<title>YATA</title>
	<meta name="description" content="Yet Another Todo Application" />
</svelte:head>

<div class="space-y-4 rounded border border-slate-400 p-6">
	<header class="space-y-2">
		<h1 class="text-4xl text-slate-900">YATA</h1>
		<h2 class="text-slate-700">Yet Another Todo Application</h2>
	</header>
	<hr class="border-t border-dashed border-slate-400" />
	<form onsubmit={onSubmit}>
		<div
			class="flex flex-row items-center overflow-hidden rounded border border-slate-600"
		>
			<input
				type="text"
				class="text-md flex flex-1 bg-slate-50 px-2 py-3"
				placeholder="Enter a new todo"
				bind:value={input}
			/>
			<button
				type="submit"
				class="flex bg-slate-600 p-3 text-slate-50 transition-colors duration-200 ease-in-out hover:bg-slate-700"
			>
				Add todo
			</button>
		</div>
	</form>
	<section class="flex flex-col">
		{#if !!todos.length}
			<ul class="space-y-2">
				{#each todos as todo, index}
					<li
						class="flex flex-row items-center gap-2 rounded border border-slate-600 bg-slate-50 p-3"
					>
						<label
							class={cn(
								"flex flex-1 gap-2",
								todo.completed && "text-slate-400 line-through",
							)}
						>
							<input
								type="checkbox"
								class="form-checkbox"
								onchange={() => toggleTodo(index)}
								checked={todo.completed}
							/>
							{todo.text}
						</label>
						<button
							class="rounded bg-slate-600 p-2 text-slate-50 transition-colors duration-200 ease-in-out hover:bg-slate-700"
							onclick={() => removeTodo(index)}
							><Trash2 size={16} />
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<span
				class="rounded border border-dashed border-slate-500 bg-slate-50 p-3 font-light text-slate-500"
			>
				No todos yet...
			</span>
		{/if}
	</section>
</div>
