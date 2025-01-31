import { type RequestEvent, fail } from '@sveltejs/kit';

export const logout = async (event: RequestEvent) => {
	if (!event.locals.session) {
		return fail(401);
	}
	await auth.invalidateSession(event.locals.session.id);
	auth.deleteSessionTokenCookie(event);

	return redirect(302, '/demo/lucia/login');
};
