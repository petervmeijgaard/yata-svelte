<script lang="ts">
	import { Button } from "@/components/ui/button";
	import * as Card from "@/components/ui/card";
	import { Checkbox } from "@/components/ui/checkbox";
	import { Input } from "@/components/ui/input";
	import { Label } from "@/components/ui/label";
	import { useTodos } from "$lib/useTodos.svelte";
	import { cn } from "$lib/utils";
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

<Card.Root>
	<Card.Header>
		<Card.Title>YATA</Card.Title>
		<Card.Description>Yet Another Todo Application</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-4">
		<form on:submit={onSubmit}>
			<div class="flex flex-row items-center gap-2">
				<Input type="text" placeholder="Enter a new todo" bind:value={input} />
				<Button size="sm" type="submit">Add todo</Button>
			</div>
		</form>
		<section class="flex flex-col">
			{#if !!todos.length}
				<ul class="space-y-2">
					{#each todos as todo, index}
						<li
							class="flex flex-row items-center gap-2 rounded border px-3 py-2"
						>
							<Checkbox
								on:click={() => toggleTodo(index)}
								checked={todo.completed}
								id={`todo-${index}`}
							/>
							<Label
								class={cn(
									"flex flex-1 gap-2",
									todo.completed && "text-muted-foreground line-through",
								)}
								for={`todo-${index}`}
							>
								{todo.text}
							</Label>
							<Button on:click={() => removeTodo(index)}>
								<Trash2 class="h-4 w-4" />
							</Button>
						</li>
					{/each}
				</ul>
			{:else}
				<span
					class="text-muted-foreground flex rounded-md border border-dashed px-3 py-2 text-sm"
				>
					No todos yet...
				</span>
			{/if}
		</section>
	</Card.Content>
</Card.Root>
