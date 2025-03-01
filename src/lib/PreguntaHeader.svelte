<script lang="ts">
	import { prueba } from './stores.svelte';
	import TipoPicker from './TipoPicker.svelte';
	import type { ItemInput } from './types';
	let { item, display_idx }: ItemInput = $props();
</script>

<div class="flex flex-row gap-4">
	<h2>{display_idx}.-</h2>
	<TipoPicker {item}></TipoPicker>
	<button
		onclick={() => {
			prueba.removeAt();
		}}>borrar</button
	>
</div>
<label>
	Pregunta:
	<input class="border" type="text" bind:value={item.texto} />
</label>
