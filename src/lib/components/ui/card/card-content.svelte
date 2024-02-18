<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	type Props = HTMLAttributes<HTMLDivElement>;

	const { class: className, children, ...restProps } = $props<Props>();
</script>

<div class={cn("p-6 pt-0", className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
