<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { generate_pdf } from '$lib/pdf/main';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<Header />
LANDING PAGE!!!
