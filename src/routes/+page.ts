import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
	// en este caso 'data' es lo que retornó el +page.server.ts
	return { pruebas: data.pruebas };
};
