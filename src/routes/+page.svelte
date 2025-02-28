<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Pregunta from '$lib/Pregunta.svelte';
	import { generate_pdf } from '$lib/pdf/main';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();

	let pdf = $state('');
	console.log(data.pruebas);
	onMount(async () => {
		pdf = await generate_pdf(data.pruebas[0]);
	});
</script>

<Header />
LANDING PAGE!!!
<Pregunta pregunta={data.pruebas[0].items[0].preguntas[0]} />
<iframe class="min-h-screen w-full" src={pdf} title="prueba"></iframe>
