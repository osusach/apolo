import { db } from '$lib/server/db';
import { itemsTable, pruebasTable } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { id } = await db
		.insert(pruebasTable)
		.values({ nombre: 'asd', ultimaModificacion: new Date() })
		.returning({ id: pruebasTable.id })
		.get();

	await db.insert(itemsTable).values({ nombre: 'item 1', pruebaId: id });
	const prueba = await db.query.pruebasTable.findMany({
		with: { items: { with: { preguntas: true } } }
	});
	console.log(prueba, locals.session);

	return {};
};
