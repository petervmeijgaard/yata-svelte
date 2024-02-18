<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	type Props = HTMLAttributes<HTMLParagraphElement>;

	const { class: className, children, ...restProps } = $props<Props>();
</script>

<p class={cn("text-sm text-muted-foreground", className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</p>
