<script lang="ts">
    import { writable } from 'svelte/store';
  
    // Se definen las variables reactivas
    let pruebaNombre = '';
    let items = writable<Array<Item>>([]);

    // Se controla el estado del flujo de creación de ítems
    let creandoItem = false;
    let tipoItemSeleccionado: 'libre' | 'fijo' | null = null;
    let tipoPreguntaFija: TipoPregunta | null = null;

    // Agregar nuevo item
    const addItem = () => {
        if (tipoItemSeleccionado === 'libre') {
            items.update((current) => [...current, { tipo: 'libre', preguntas: [] }]);
        } else if (tipoItemSeleccionado === 'fijo' && tipoPreguntaFija) {
            items.update((current) => [...current, { tipo: 'fijo', tipoFijo: tipoPreguntaFija, preguntas: [] }]);
        }

        // Se resetean las variables de control
        creandoItem = false;
        tipoItemSeleccionado = null;
        tipoPreguntaFija = null;
    }

    // Agregar una pregunta
    const addPregunta = (itemIndex: number, tipo?: TipoPregunta) => {
        items.update((current) => {
            const item = current[itemIndex];

            let tipoPregunta: TipoPregunta = item.tipo === "fijo" ? item.tipoFijo! : tipo!;

            let nuevaPregunta: Pregunta;

            console.log(tipoPregunta);

            if (tipoPregunta === 'seleccion_multiple') {
                nuevaPregunta = { texto: '', opciones: ['', '', ''], alternativas: ['', '', '', ''] };
            } else if (tipoPregunta === 'seleccion_unica') {
                nuevaPregunta = { texto: '', alternativas: ['', '', '', ''] };
            } else if (tipoPregunta === 'booleana') {
                nuevaPregunta = { texto: '', alternativas: ['Verdadero', 'Falso'] };
            } else {
                nuevaPregunta = { texto: '', tamaño: 'chico' };
            }

            item.preguntas = [...item.preguntas, nuevaPregunta];

            return [...current];
        });
    };

    // Eliminar una pregunta
    const removePregunta = (itemIndex: number, preguntaIndex: number) => {
        items.update((current) => {
            current[itemIndex].preguntas.splice(preguntaIndex, 1);
            return [...current];
        });
    };

    // Eliminar una opción
    const removeOpcion = (itemIndex: number, preguntaIndex: number, opcionIndex: number) => {
        items.update((current) => {
            current[itemIndex].preguntas[preguntaIndex].opciones.splice(opcionIndex, 1);
            return [...current];
        });
    };

    // Eliminar una alternativa
    const removeAlternativa = (itemIndex: number, preguntaIndex: number, alternativaIndex: number) => {
        items.update((current) => {
            current[itemIndex].preguntas[preguntaIndex].alternativas.splice(alternativaIndex, 1);
            return [...current];
        });
    };

    // Eliminar un ítem
    const removeItem = (itemIndex: number) => {
        items.update((current) => {
            current.splice(itemIndex, 1);
            return [...current];
        });
    };

    // Guardar la prueba
    const savePrueba = async () => {
        const pruebaData = {
            nombre: pruebaNombre,
            items: $items,
        };

        const response = await fetch('/api/pruebas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pruebaData),
        });

        if (response.ok) {
            alert('Prueba guardada con éxito');
        } else {
            alert('Error al guardar la prueba');
        }
    };
  
</script>
  
<main>
    <div class="mx-auto mt-10 w-4/5 max-w-2xl bg-white p-6 border border-gray-300 rounded-md">
        <h1 class="text-lg font-bold text-gray-700 mb-4">Nombre de prueba</h1>
        <input
            type="text"
            placeholder="Ej: Evaluación Matemáticas"
            bind:value={pruebaNombre}
            class="w-full p-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h2 class="text-md font-semibold text-gray-600 mb-2">Ítems</h2>

        <!-- Botón para crear nuevo ítem -->
        {#if !creandoItem}
            <button class="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" 
                    on:click={() => creandoItem = true}>
                Crear Ítem
            </button>
        {/if}

        <!-- Selección del tipo de ítem después de presionar "Crear Ítem" -->
        {#if creandoItem && tipoItemSeleccionado === null}
            <div class="flex justify-center gap-4 mt-4">
                <button class="p-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        on:click={() => tipoItemSeleccionado = 'libre'}>
                    Ítem libre
                </button>
                <button class="p-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        on:click={() => tipoItemSeleccionado = 'fijo'}>
                    Ítem fijo
                </button>
            </div>
        {/if}

        <!-- Si se selecciona "Ítem fijo", elegir el tipo de pregunta -->
        {#if tipoItemSeleccionado === 'fijo' && tipoPreguntaFija === null}
            <h3 class="text-md font-semibold text-gray-600 mt-4">Selecciona el tipo de pregunta</h3>
            <div class="flex flex-wrap gap-2 justify-center">
                <button class="p-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        on:click={() => tipoPreguntaFija = 'seleccion_unica'}>
                    Selección única
                </button>
                <button class="p-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        on:click={() => tipoPreguntaFija = 'seleccion_multiple'}>
                    Selección múltiple
                </button>
                <button class="p-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        on:click={() => tipoPreguntaFija = 'booleana'}>
                    Verdadero/Falso
                </button>
                <button class="p-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        on:click={() => tipoPreguntaFija = 'abierta'}>
                    Pregunta abierta
                </button>
            </div>
        {/if}

        <!-- Botón final para agregar el ítem -->
        {#if tipoItemSeleccionado !== null && (tipoItemSeleccionado === 'libre' || tipoPreguntaFija !== null)}
            <button class="w-full p-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                    on:click={addItem}>
                Agregar Ítem
            </button>
        {/if}

        <!-- Sección donde se muestran los ítems -->
        {#each $items as item, itemIndex}
            <div class="mb-4 p-4 border border-gray-300 rounded-md">
                <h3 class="text-sm font-semibold text-gray-700">Preguntas</h3>

                <!-- Aquí se muestran las preguntas existentes -->
                {#each item.preguntas as pregunta, preguntaIndex}
                    <!-- Contenedor para una pregunta -->
                    <div class="mb-4 p-4 bg-gray-50 border border-gray-300 rounded-md">
                        <!-- 🌟 Grid de 3 columnas para la pregunta -->
                        <div class="grid grid-cols-[auto_1fr_auto] gap-4 mb-4">
                            <!-- 📌 Número de pregunta -->
                            <div class="flex items-center">
                                <span class="text-sm font-semibold text-gray-600">{preguntaIndex + 1}.</span>
                            </div>
                            <!-- ✍️ Input de texto de la pregunta -->
                            <input
                                type="text"
                                placeholder="Texto de la pregunta"
                                bind:value={pregunta.texto}
                                class="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <!-- ❌ Botón eliminar pregunta -->
                            <div class="flex items-center">
                                <button
                                    class="w-8 h-8 bg-gray-300 text-white text-lg font-bold rounded-full flex items-center justify-center shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                                    on:click={() => removePregunta(itemIndex, preguntaIndex)}
                                    aria-label="Eliminar Pregunta"
                                >
                                    -
                                </button>
                            </div>
                        </div>

                        <!-- Opciones -->
                        {#if pregunta.opciones}
                            <h4 class="text-sm font-semibold text-gray-500 mb-2">Opciones</h4>
                            {#each pregunta.opciones as opcion, opcionIndex}
                                <div class="grid grid-cols-[auto_1fr_auto] gap-4 mb-2">
                                    <!-- Número de opción -->
                                    <div class="flex items-center">
                                        <span>{opcionIndex + 1}.</span>
                                    </div>
                                    <!-- Input de texto de la opción -->
                                    <input
                                        type="text"
                                        bind:value={pregunta.opciones[opcionIndex]}
                                        class="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <!-- Botón eliminar opción -->
                                    <div class="flex items-center">
                                        <button
                                            class="w-8 h-8 bg-gray-300 text-white text-lg font-bold rounded-full flex items-center justify-center shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                                            on:click={() => removeOpcion(itemIndex, preguntaIndex, opcionIndex)}
                                            aria-label="Eliminar Opción"
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        {/if}

                        <!-- Alternativas -->
                        {#if pregunta.alternativas}
                            <h4 class="text-sm font-semibold text-gray-500 mt-4 mb-2">Alternativas</h4>
                            {#each pregunta.alternativas as alternativa, alternativaIndex}
                                <div class="grid grid-cols-[auto_1fr_auto] gap-4 mb-2">
                                    <!-- Letra de alternativa -->
                                    <div class="flex items-center">
                                        <span>{String.fromCharCode(97 + alternativaIndex)})</span>
                                    </div>
                                    <!-- Input de texto de la alternativa -->
                                    <input
                                        type="text"
                                        bind:value={pregunta.alternativas[alternativaIndex]}
                                        class="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <!-- Botón eliminar alternativa -->
                                    <div class="flex items-center">
                                        <button
                                            class="w-8 h-8 bg-gray-300 text-white text-lg font-bold rounded-full flex items-center justify-center shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                                            on:click={() => removeAlternativa(itemIndex, preguntaIndex, alternativaIndex)}
                                            aria-label="Eliminar Alternativa"
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        {/if}
                    </div>

                {/each}

                <!-- Condición para agregar pregunta dependiendo si el ítem es libre u opcional-->
                {#if item.tipo === 'libre'}
                    <button class="p-1 bg-green-500 text-white rounded" on:click={() => addPregunta(itemIndex, 'seleccion_unica')}>Agregar pregunta de selección única</button>
                    <button class="p-1 bg-green-500 text-white rounded" on:click={() => addPregunta(itemIndex, 'seleccion_multiple')}>Agregar pregunta de selección múltiple</button>
                    <button class="p-1 bg-green-500 text-white rounded" on:click={() => addPregunta(itemIndex, 'booleana')}>Agregar pregunta verdadero/falso</button>
                    <button class="p-1 bg-green-500 text-white rounded" on:click={() => addPregunta(itemIndex, 'abierta')}>Agregar pregunta abierta</button>
                {/if}
                {#if item.tipo === 'fijo'}
                    <div class="flex justify-center">
                        <button 
                            class="w-10 h-10 bg-green-500 text-white text-lg font-bold rounded-full flex items-center justify-center shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                            on:click={() => addPregunta(itemIndex)}
                            aria-label="Agregar Pregunta"
                        >
                            +
                        </button>
                    </div>
                {/if}
            </div>
        {/each}

        <!-- Botón para guardar la prueba -->
        <button class="w-full p-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600" on:click={savePrueba}>
            Guardar prueba
        </button>
    </div>
</main>
