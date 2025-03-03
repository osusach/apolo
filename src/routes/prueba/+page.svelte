<script lang="ts">
	import { nuevaMultiple, nuevoTitulo, section_style } from '$lib';
	import ComponenteItem from '$lib/ComponenteItem.svelte';
	import { generate_pdf } from '$lib/pdf/main';
	import { prueba } from '$lib/stores.svelte';

	let url = $state('');
	let showPreview = $state(false);
	// Guardar la prueba
	const savePrueba = async () => {
		const response = await fetch('/api/prueba', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(prueba)
		});

		if (response.ok) {
			alert('Prueba guardada con éxito');
		} else {
			alert('Error al guardar la prueba');
		}
	};
</script>

<div class="flex flex-row justify-center gap-x-8 p-4">
	{#if showPreview}
		<iframe title="preview" src={url} class="sticky top-4 h-[95vh] w-3/4"> </iframe>
	{/if}
	<main class="flex w-4/5 max-w-2xl flex-col gap-y-8">
		<div class={section_style}>
			<h1 class="mb-4 text-lg font-bold text-gray-700">Nombre de prueba</h1>
			<input
				type="text"
				placeholder="Ej: Evaluación Matemáticas"
				bind:value={prueba.nombre}
				class="mb-4 w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		{#each prueba.contenido as item, item_idx}
			<ComponenteItem {item} {item_idx} display_idx={prueba.getItemIndex(item_idx)} />
		{/each}
	</main>

	<!-- Sidebar -->
	<div class={'sticky top-4 grid h-fit grid-flow-row gap-1 ' + section_style}>
		<button
			class="bg-blue-300 p-1"
			onclick={() => {
				prueba.insertTitle();
			}}>Crear Item</button
		>
		<button
			class="bg-blue-300 p-1"
			onclick={() => {
				prueba.insertItem();
			}}>Agregar pregunta abajo</button
		>
		<button
			onclick={async () => {
				url = await generate_pdf(prueba.get());
				showPreview = true;
			}}>Crear PDF</button
		>
		<button>Cosas 4</button>
	</div>
</div>
