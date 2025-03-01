<script lang="ts">
	import { listaTipos, nuevaAbierta, nuevaMultiple, nuevaUnica, nuevoItem } from '$lib';
	import { prueba } from './stores.svelte';
	import type { Item } from './types';

	let { item = $bindable() }: { item: Item } = $props();
	let tipo = $state(item.tipo);
</script>

<div class="flex flex-row gap-4">
	<label>
		Tipo pregunta:
		<select
			bind:value={tipo}
			onchange={() => {
				prueba.replaceAt(nuevoItem(tipo));
			}}
		>
			{#each listaTipos as tipo}
				<option>{tipo}</option>
			{/each}
		</select>
	</label>
</div>
