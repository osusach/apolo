<script lang="ts">
	import PreguntaMultiple from './PreguntaMultiple.svelte';
	import PreguntaUnica from './PreguntaUnica.svelte';
	import ComponenteTitulo from './ComponenteTitulo.svelte';
	import type { ItemInput } from './types';
	import { focusedIndex } from './stores.svelte';
	import { get } from 'svelte/store';
	import { section_style } from '$lib';

	const { item, item_idx, display_idx }: ItemInput = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={(item_idx == $focusedIndex ? 'bg-green-100 ' : ' ') + section_style}
	onclick={() => {
		console.log('a');
		focusedIndex.set(item_idx);
		console.log(get(focusedIndex));
	}}
>
	{#if item.tipo == 'titulo'}
		<ComponenteTitulo {item} {item_idx} {display_idx}></ComponenteTitulo>
	{:else if item.tipo == 'multiple'}
		<PreguntaMultiple {item} {item_idx} {display_idx}></PreguntaMultiple>
	{:else if item.tipo == 'unica'}
		<PreguntaUnica {item} {item_idx} {display_idx}></PreguntaUnica>
	{:else}
		<p>Tipo de pregunta no soportado.</p>
	{/if}
</div>
