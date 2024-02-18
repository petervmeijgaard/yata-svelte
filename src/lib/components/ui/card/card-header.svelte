<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	type Props = HTMLAttributes<HTMLDivElement>;

	const { class: internalClass, children, ...restProps } = $props<Props>();
</script>

<div class={cn("flex flex-col space-y-1.5 p-6", internalClass)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
