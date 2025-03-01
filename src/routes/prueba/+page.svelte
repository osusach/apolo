<script lang="ts">
	import { nuevaMultiple, nuevoTitulo, section_style } from '$lib';
	import ComponenteItem from '$lib/ComponenteItem.svelte';
	import { prueba } from '$lib/stores.svelte';
	// let focusedIndex = $state(0);
	// Se definen las variables reactivas

	// Agregar una pregunta
	/* const addPregunta = (itemIndex: number, tipo?: Pregunta) => {
		const item = items[itemIndex];

		let tipoPregunta: Pregunta = item.tipo === 'fijo' ? item.tipoFijo! : tipo!;

		let nuevaPregunta: Pregunta;

		console.log(tipoPregunta);

		if (tipoPregunta === 'multiple') {
			nuevaPregunta = {
				tipo: 'seleccion_multiple',
				texto: '',
				opciones: ['', '', ''],
				alternativas: ['', '', '', '']
			};
		} else if (tipoPregunta === 'seleccion_unica') {
			nuevaPregunta = { tipo: 'seleccion_unica', texto: '', alternativas: ['', '', '', ''] };
		} else if (tipoPregunta === 'booleana') {
			nuevaPregunta = { tipo: 'booleana', texto: '', alternativas: ['Verdadero', 'Falso'] };
		} else {
			//if (tipoPregunta === 'abierta')
			nuevaPregunta = { tipo: 'abierta', texto: '', tamaño: 'chico' };
		}

		item.preguntas.push(nuevaPregunta);
	}; 

	// Eliminar una pregunta
	const removePregunta = (itemIndex: number, preguntaIndex: number) => {
		items[itemIndex].preguntas.splice(preguntaIndex, 1);
	};

	// Eliminar una opción
	const removeOpcion = (itemIndex: number, preguntaIndex: number, opcionIndex: number) => {
		let pregunta = items[itemIndex].preguntas[preguntaIndex];
		if (pregunta.tipo === 'seleccion_multiple') {
			let multiple = pregunta as PreguntaMultiple;
			multiple.opciones.splice(opcionIndex, 1);
		}
	};

	// Eliminar una alternativa
	const removeAlternativa = (
		itemIndex: number,
		preguntaIndex: number,
		alternativaIndex: number
	) => {
		let pregunta = items[itemIndex].preguntas[preguntaIndex];
		if (
			pregunta.tipo === 'seleccion_unica' ||
			pregunta.tipo === 'seleccion_multiple' ||
			pregunta.tipo === 'booleana'
		) {
			let p_c_alternativa = pregunta as PreguntaUnica | PreguntaMultiple | PreguntaBooleana;
			p_c_alternativa.alternativas.splice(alternativaIndex, 1);
		}
	};

	// Eliminar un ítem
	const removeItem = (itemIndex: number) => {
		items.splice(itemIndex, 1);
	};

*/
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

	$inspect(prueba);
</script>

<div class="flex flex-row justify-center gap-x-8 p-4">
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
	<div class={'grid h-fit grid-flow-row gap-1 ' + section_style}>
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
		<button>Cosas 3</button>
		<button>Cosas 4</button>
	</div>
</div>
