import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel } from 'drizzle-orm';

export const userTable = sqliteTable('user', {
	id: text().primaryKey(),
	username: text().notNull(),
	passwordHash: text().notNull()
});

export const sessionTable = sqliteTable('session', {
	id: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer({
		mode: 'timestamp'
	}).notNull()
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
