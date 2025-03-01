import { get, writable } from 'svelte/store';
import type { Item, Prueba } from './types';
import { nuevoItem, nuevoTitulo } from '$lib';

export const prueba = createPrueba();

export const focusedIndex = writable(0);

function createPrueba() {
	const value: Prueba = $state({
		contenido: [],
		nombre: 'Nueva Prueba',
		ultimaModificacion: new Date()
	});

	let correctIndex: number[] = $state([]);

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
		get: () => {
			return value;
		},
		contenido: value.contenido,
		get nombre() {
			return value.nombre;
		},
		set nombre(v) {
			value.nombre = v;
		},

		getItemIndex: (index: number) => {
			return correctIndex[index];
		},
		insertItem: () => {
			const newIndex = get(focusedIndex) + 1;
			const tipo = value.contenido[newIndex - 1]?.tipo ?? 'unica';
			const item = nuevoItem(tipo);
			value.contenido.splice(newIndex, 0, item);
			focusedIndex.set(newIndex);
			correctIndex.push(newIndex);
			updateCorrectIndex();
		},
		insertTitle: () => {
			const newIndex = get(focusedIndex) + 1;
			value.contenido.splice(newIndex, 0, nuevoTitulo);
			focusedIndex.set(newIndex);
			correctIndex.push(newIndex);
			updateCorrectIndex();
		},
		removeAt: () => {
			const index = get(focusedIndex);
			value.contenido.splice(index, 1);
			correctIndex.splice(index, 1);
			updateCorrectIndex();
		},
		replaceAt: (item: Item) => {
			const index = get(focusedIndex);
			item.texto = value.contenido[index].texto;
			if (item.tipo == 'titulo') return;
			value.contenido[index] = item;
		}
	};
}
