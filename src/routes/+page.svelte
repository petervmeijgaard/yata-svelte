<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { superForm } from "sveltekit-superforms";
	import { default as Todo } from "$lib/components/todo.svelte";
	import type { PageData } from "./$types";

	type Props = {
		data: PageData;
	};

	const { data } = $props<Props>();

	const {
		form: addTodoForm,
		constraints: addTodoConstraints,
		enhance: addTodoEnhance,
	} = superForm(data.addTodoForm);
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
		<form method="POST" action="/?/addTodo" use:addTodoEnhance>
			<div class="flex flex-row items-center gap-2">
				<Input
					type="text"
					placeholder="Enter a new todo"
					name="todo"
					bind:value={$addTodoForm.todo}
					{...$addTodoConstraints.todo}
				/>
				<Button size="sm" type="submit">Add todo</Button>
			</div>
		</form>
		<section class="flex flex-col">
			{#if !!data.todos.length}
				<ul class="space-y-2">
					{#each data.todos as todo}
						<Todo
							{...todo}
							removeTodoForm={data.removeTodoForm}
							toggleTodoForm={data.toggleTodoForm}
						/>
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
