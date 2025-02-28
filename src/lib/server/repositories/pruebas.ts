import type { Pregunta, Prueba } from '$lib/types';
import { db } from '../db';
import { itemsTable, preguntasTable, pruebasTable } from '../db/schema';

export const savePrueba = async (prueba: Prueba) => {
	const { prueba_id } = await db
		.insert(pruebasTable)
		.values({ nombre: prueba.nombre, ultimaModificacion: new Date() })
		.returning({ prueba_id: pruebasTable.id })
		.get();

	const newItems = prueba.items.map((item) => {
		return { ...item, pruebaId: prueba_id };
	});

	const item_ids = await db
		.insert(itemsTable)
		.values(newItems)
		.returning({ id_item: itemsTable.id });

	item_ids.forEach(async (item_id, idx) => {
		const newPreguntas = newItems[idx].preguntas.map((pregunta: Pregunta) => {
			return { tipo: pregunta.tipo, itemId: item_id.id_item, contenido: pregunta };
		});

		await db.insert(preguntasTable).values(newPreguntas);
	});
};
