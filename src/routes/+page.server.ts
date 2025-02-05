import { db } from '$lib/server/db';
import { pruebasTable, type Prueba } from '$lib/server/db/schema';
import { savePrueba } from '$lib/server/repositories/pruebas';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Esta función se corre cada vez que se abre la pagina, por ahora hace:
	// 1) borrar todo, para que no se acumule
	// 2) pushear una prueba con 2 items y preguntas
	// 3) sacar todas las pruebas de la db y mandarlas al front

	await db.delete(pruebasTable);

	const pregunta_multiple: Multiple = {
		pregunta: 'Esta pregunta es multiple?',
		valores: ['si', 'no', 'a veces']
	};
	const pregunta_abierta: Abierta = { pregunta: 'Esta pregunta es abierta?', tamaño: 'chico' };

	const prueba: Prueba = {
		nombre: 'Prueba 1',
		ultimaModificacion: new Date(),
		items: [
			{
				nombre: 'item 1',
				preguntas: [{ tipo: 'Multiple', contenido: pregunta_multiple }],
				tipo: 'Multiple'
			},
			{
				nombre: 'item 2',
				preguntas: [{ tipo: 'Abierta', contenido: pregunta_abierta }],
				tipo: 'Abierta'
			}
		]
	};

	await savePrueba(prueba);

	const pruebas = await db.query.pruebasTable.findMany({
		with: { items: { with: { preguntas: true } } }
	}) as Prueba[];

	return { pruebas };
};
