<script lang="ts">
	import "../app.pcss";
	import type { PropsWithChildren } from "../types";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props<PropsWithChildren>();
</script>

<ModeWatcher />

<div class="flex min-h-screen min-w-full flex-1 bg-background">
	<div class="container mx-auto p-4 md:p-6">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
