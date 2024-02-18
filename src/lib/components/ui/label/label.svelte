<script lang="ts">
	import { Label } from "bits-ui";
	import { cn } from "$lib/utils";

	type Props = Label.Props;

	const { class: className, children, ...restProps } = $props<Props>();

	$effect(() => {
		console.log(className);
	});
</script>

<Label.Root
	class={cn(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		className,
	)}
	{...restProps}
	on:mousedown
>
	{#if children}
		{@render children()}
	{/if}
</Label.Root>
