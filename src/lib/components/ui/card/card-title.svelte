<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";
	import type { HeadingLevel } from "./types";

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
	};

	const {
		class: className,
		tag = "h3",
		children,
		...restProps
	} = $props<Props>();
</script>

<svelte:element
	this={tag}
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
