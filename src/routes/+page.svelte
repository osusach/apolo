<script lang="ts">
	import Header from '$lib/Header.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	console.log(data.pruebas);
</script>

<Header />
LANDING PAGE!!!
