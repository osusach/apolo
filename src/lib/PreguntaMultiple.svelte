<script lang="ts">
	import PreguntaHeader from './PreguntaHeader.svelte';
	import type { ItemInput } from './types';

	let { item, item_idx, display_idx }: ItemInput = $props();
</script>

<PreguntaHeader {item} {display_idx}></PreguntaHeader>
<p>multiple {item_idx} {item.texto} {item.tipo}</p>
