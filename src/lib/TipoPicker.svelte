<script lang="ts">
	import { listaTipos } from '$lib';
	let { item = $bindable() } = $props();
</script>

<div class="flex flex-row gap-4">
	{#if item.tipo}
		<select bind:value={item.tipo}>
			{#each listaTipos as tipo}
				<option>{tipo}</option>
			{/each}
		</select>
	{/if}
</div>
