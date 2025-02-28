<script lang="ts">
	import { section_style, listaTipos } from '$lib';
	import { get } from 'svelte/store';
	import { focusedIndex } from './stores.svelte';
	import type { ItemInput } from './types';

	let { item, item_idx, display_idx }: ItemInput = $props();
</script>

<h2 class="text-md mb-2 font-semibold text-gray-600">{display_idx}.- {item.texto}</h2>
