import type { Abierta, Booleana, Item, Multiple, TipoItem, Titulo, Unica } from './types';

// Crear un array con el abecedario
export const abecedario = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const numerosRomanos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export const textoNuevaOpcion = 'nueva opción';
export const textoNuevaAlternativa = 'nueva alternativa';

export const nuevoTitulo: Titulo = {
	indice: 1,
	texto: 'Nuevo Titulo',
	tipo: 'titulo'
};
export const nuevaMultiple: Multiple = {
	texto: 'Esta pregunta es multiple?',
	opciones: ['si', 'no', 'a veces'],
	alternativas: ['1, 2', '2', '3'],
	tipo: 'multiple'
};
export const nuevaAbierta: Abierta = {
	texto: 'Esta pregunta es abierta?',
	tamaño: 'chico',
	tipo: 'abierta'
};
export const nuevaUnica: Unica = {
	tipo: 'unica',
	texto: 'Esta pregunta es unica?',
	alternativas: ['si', 'no']
};

export const listaTipos: TipoItem[] = ['multiple', 'unica', 'booleana', 'abierta'];

export const section_style = 'rounded-md border border-gray-300 p-6 flex flex-col gap-y-4';

export function nuevoItem(tipo: TipoItem) {
	if (tipo == 'unica') return nuevaUnica;
	if (tipo == 'multiple') return nuevaMultiple;
	if (tipo == 'booleana') return nuevaUnica;
	if (tipo == 'abierta') return nuevaAbierta;
	return nuevaUnica;
}

export function hasAlternativa(pregunta: Item) {
	if (pregunta.tipo === 'unica' || pregunta.tipo === 'multiple' || pregunta.tipo === 'booleana') {
		return pregunta as Multiple | Unica | Booleana;
	}
	return null;
}

export function isMultiple(item: Item) {
	if (item.tipo == 'multiple') {
		return item as Multiple;
	}
	return null;
}

export function isUnica(item: Item) {
	if (item.tipo == 'unica') {
		return item as Unica;
	}
	return null;
}

export function isBooleana(item: Item) {
	if (item.tipo == 'booleana') {
		return item as Booleana;
	}
	return null;
}

export function isAbierta(item: Item) {
	if (item.tipo == 'abierta') {
		return item as Abierta;
	}
	return null;
}
