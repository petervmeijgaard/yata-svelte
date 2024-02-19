<script lang="ts" context="module">
	// Types commented out to work on Stackblitz.
	type T = Record<string, unknown>;
	type M = unknown;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, M">
	import { superForm, type SuperValidated } from "sveltekit-superforms";
	import type { HTMLFormAttributes } from "svelte/elements";

	type Props = HTMLFormAttributes & {
		data: SuperValidated<T, M>;
		dataType?: "form" | "json";
		invalidateAll?: boolean;
	};

	const {
		data,
		dataType = "form",
		invalidateAll = true,
		children,
		...rest
	} = $props<Props>();

	const theForm = superForm(data, {
		dataType,
		invalidateAll,
	});

	const { message, delayed, errors, allErrors, enhance } = theForm;
</script>

<form method="POST" use:enhance {...rest}>
	{#if children}
		{@render children({ form: theForm, message, delayed, errors, allErrors })}
	{/if}
</form>
