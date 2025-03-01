<script lang="ts">
	import type { ItemInput } from './types';

	let { item, display_idx }: ItemInput = $props();
</script>

<h2 class="text-md mb-2 font-semibold text-gray-600">
	{display_idx}.-
	<input class="border" type="text" bind:value={item.texto} />
</h2>
