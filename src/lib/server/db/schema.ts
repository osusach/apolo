import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

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
	nombre: text().notNull(),
	pruebaId: integer('prueba_id')
		.notNull()
		.references(() => pruebasTable.id, { onDelete: 'cascade' })
});

export const itemsRelations = relations(itemsTable, ({ one, many }) => ({
	pruebas: one(pruebasTable, { fields: [itemsTable.pruebaId], references: [pruebasTable.id] }),
	preguntas: many(preguntasTable)
}));

export const preguntasTable = sqliteTable('preguntas', {
	id: integer().primaryKey({ autoIncrement: true }),
	itemId: integer('item_id')
		.notNull()
		.references(() => itemsTable.id, { onDelete: 'cascade' })
});

export const preguntasRelations = relations(preguntasTable, ({ one }) => ({
	items: one(itemsTable, { fields: [preguntasTable.itemId], references: [itemsTable.id] })
}));

export type User = typeof userTable.$inferSelect;
export type Session = typeof sessionTable.$inferSelect;
export type Prueba = typeof pruebasTable.$inferSelect;
export type Items = typeof itemsTable.$inferSelect;
export type Preguntas = typeof preguntasTable.$inferSelect;
