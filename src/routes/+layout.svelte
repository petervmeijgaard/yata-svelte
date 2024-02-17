<script lang="ts">
	import { type Snippet } from "svelte";
	import "../app.css";

	let { children } = $props<{ children: Snippet }>();
</script>

<div class="flex min-h-screen min-w-full flex-1 bg-slate-100">
	<div class="container mx-auto p-4 md:p-6">
		{@render children()}
	</div>
</div>
