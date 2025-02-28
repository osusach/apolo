import { db } from '$lib/server/db';
import { pruebasTable } from '$lib/server/db/schema';
import { savePrueba } from '$lib/server/repositories/pruebas';
import type { Abierta, Multiple, Pregunta, Prueba } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Esta función se corre cada vez que se abre la pagina, por ahora hace:
	// 1) borrar todo, para que no se acumule
	// 2) pushear una prueba con 2 items y preguntas
	// 3) sacar todas las pruebas de la db y mandarlas al front

	await db.delete(pruebasTable);

	const pregunta_multiple: Multiple = {
		texto: 'Esta pregunta es multiple?',
		opciones: ['si', 'no', 'a veces'],
		alternativas: ['', '', ''],
		tipo: 'multiple'
	};
	const pregunta_abierta: Abierta = {
		texto: 'Esta pregunta es abierta?',
		tamaño: 'chico',
		tipo: 'abierta'
	};

	const prueba: Prueba = {
		nombre: 'Prueba 1',
		ultimaModificacion: new Date(),
		items: [
			{
				nombre: 'item 1',
				preguntas: [pregunta_multiple],
				tipo: 'multiple'
			},
			{
				nombre: 'item 2',
				preguntas: [pregunta_abierta],
				tipo: 'abierta'
			}
		]
	};
	await savePrueba(prueba);
	const pruebas = await db.query.pruebasTable.findMany({
		with: { items: { with: { preguntas: true } } }
	});

	return { pruebas };
};
