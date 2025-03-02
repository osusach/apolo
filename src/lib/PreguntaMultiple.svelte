<script lang="ts">
	import { abecedario, numerosRomanos, textoNuevaAlternativa, textoNuevaOpcion } from '$lib';
	import PreguntaHeader from './PreguntaHeader.svelte';
	import type { ItemInput, Multiple } from './types';

	let { item, item_idx, display_idx }: ItemInput = $props();
	let multiple = item as Multiple;
</script>

<button
	onclick={() => {
		multiple.opciones.push(textoNuevaOpcion);
	}}>Agregar opción</button
>
<ul class="flex flex-col gap-y-2">
	{#each multiple.opciones as _, idx}
		<li>
			{numerosRomanos[idx]})
			<input type="text" bind:value={multiple.opciones[idx]} />
			<button
				onclick={() => {
					multiple.opciones.splice(idx, 1);
				}}>X</button
			>
		</li>
	{/each}
</ul>

<button
	onclick={() => {
		multiple.alternativas.push(textoNuevaAlternativa);
	}}>Agregar alternativa</button
>
<ul class="flex flex-col gap-y-2">
	{#each multiple.alternativas as _, idx}
		<li>
			{abecedario[idx]})
			<input type="text" bind:value={multiple.alternativas[idx]} />
			<button
				onclick={() => {
					multiple.alternativas.splice(idx, 1);
				}}>X</button
			>
		</li>
	{/each}
</ul>
