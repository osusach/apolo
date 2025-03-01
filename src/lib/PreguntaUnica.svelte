<script lang="ts">
	import { abecedario } from '$lib';
	import PreguntaHeader from './PreguntaHeader.svelte';
	import type { ItemInput, Unica } from './types';

	let { item, item_idx, display_idx }: ItemInput = $props();
	let unica = item as Unica;
</script>

<ul class="flex flex-col gap-y-2">
	{#each unica.alternativas as alternativa, idx}
		<li>
			{abecedario[idx]})
			<input type="text" bind:value={unica.alternativas[idx]} />
		</li>
	{/each}
</ul>
