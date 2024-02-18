<script lang="ts">
	import { Button } from "bits-ui";
	import type { VariantProps } from "tailwind-variants";
	import { cn } from "$lib/utils";
	import { button } from "./button";

	type Props = Button.Props & VariantProps<typeof button>;

	const {
		variant = "default",
		size = "default",
		class: className,
		children,
		...restProps
	} = $props<Props>();
</script>

<Button.Root
	class={cn(button({ variant, size }), className)}
	{...restProps}
	on:click
	on:keydown
>
	{#if children}
		{@render children()}
	{/if}
</Button.Root>
