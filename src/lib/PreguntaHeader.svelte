<script lang="ts">
	import TipoPicker from './TipoPicker.svelte';
	import type { ItemInput } from './types';
	let { item, display_idx }: ItemInput = $props();
</script>

<div class="flex flex-row gap-4">
	<h2>{display_idx}</h2>
	<TipoPicker {item}></TipoPicker>
	<span>borrar</span>
</div>
