import { get, writable } from 'svelte/store';
import type { Item, Prueba } from './types';
import {} from '$lib';

export const prueba = createPrueba();

export const focusedIndex = writable(0);

function createPrueba() {
	const value: Prueba = $state({
		contenido: [],
		nombre: 'Nueva Prueba',
		ultimaModificacion: new Date()
	});

	let correctIndex: number[] = [];

	function updateCorrectIndex() {
		let lastItem = 1;
		let lastTitulo = 1;
		correctIndex = value.contenido.map((item: Item) => {
			if (item.tipo == 'titulo') {
				lastItem = 1;
				lastTitulo += 1;
				return lastTitulo - 1;
			} else {
				lastItem += 1;
				return lastItem - 1;
			}
		});
	}

	return {
		contenido: value.contenido,
		nombre: value.nombre,
		ultimaModificacion: value.ultimaModificacion,
		getItemIndex: (index: number) => {
			return correctIndex[index];
		},
		get: () => {
			return value;
		},
		insertAt: (item: Item) => {
			const newIndex = get(focusedIndex);
			value.contenido.splice(newIndex, 0, item);
			focusedIndex.set(newIndex);
			correctIndex.push(newIndex);
			updateCorrectIndex();
		}
	};
}
