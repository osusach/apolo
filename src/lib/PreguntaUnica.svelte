<script lang="ts">
	import { abecedario, textoNuevaAlternativa } from '$lib';
	import PreguntaHeader from './PreguntaHeader.svelte';
	import type { ItemInput, Unica } from './types';

	let { item, item_idx, display_idx }: ItemInput = $props();
	let unica = item as Unica;
</script>

<button
	onclick={() => {
		unica.alternativas.push(textoNuevaAlternativa);
	}}>Agregar alternativa</button
>
<ul class="flex flex-col gap-y-2">
	{#each unica.alternativas as _, idx}
		<li>
			{abecedario[idx]})
			<input type="text" bind:value={unica.alternativas[idx]} />
			<button
				onclick={() => {
					unica.alternativas.splice(idx, 1);
				}}>X</button
			>
		</li>
	{/each}
</ul>
