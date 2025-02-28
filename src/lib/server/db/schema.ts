import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import type { Item, TipoItem } from '$lib/types';

export const userTable = sqliteTable('user', {
	id: text().primaryKey(),
	username: text().notNull(),
	passwordHash: text('password_hash').notNull()
});

export const sessionTable = sqliteTable('session', {
	id: text().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at', {
		mode: 'timestamp'
	}).notNull()
});

export const pruebasTable = sqliteTable('pruebas', {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text().notNull(),
	ultimaModificacion: integer('ultima_modificacion', { mode: 'timestamp' }).notNull()
});

export const pruebasRelations = relations(pruebasTable, ({ many }) => ({
	items: many(itemsTable)
}));

export const itemsTable = sqliteTable('items', {
	id: integer().primaryKey({ autoIncrement: true }),
	tipo: text().$type<TipoItem>().notNull(),
	contenido: text({ mode: 'json' }).$type<Item>().notNull(),
	pruebaId: integer('prueba_id')
		.notNull()
		.references(() => pruebasTable.id, { onDelete: 'cascade' })
});

export const itemsRelations = relations(itemsTable, ({ one }) => ({
	pruebas: one(pruebasTable, { fields: [itemsTable.pruebaId], references: [pruebasTable.id] })
}));
