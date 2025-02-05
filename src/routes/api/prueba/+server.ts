import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.session) {
		return new Response(null, { status: 401 });
	}

	const prueba = await request.json();

	return json(prueba);
};
