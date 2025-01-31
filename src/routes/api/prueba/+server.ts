import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = ({ locals }) => {
	if (!locals.session) {
		return new Response(null, { status: 401 });
	}

	return json({});
};
