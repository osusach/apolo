import type { itemsTable, pruebasTable, sessionTable, userTable } from './server/db/schema';

type UserModel = typeof userTable.$inferSelect;
type SessionModel = typeof sessionTable.$inferSelect;
type PruebaModel = Omit<typeof pruebasTable.$inferSelect, 'id'>;
type ItemModel = Omit<typeof itemsTable.$inferSelect, 'id'>;

type Prueba = { contenido: Item[] } & PruebaModel;

type ItemInput = { item: Item; item_idx: number; display_idx: number };

type TipoItem = 'multiple' | 'abierta' | 'booleana' | 'unica' | 'titulo';

type Multiple = {
	tipo: 'multiple';
	texto: string;
	opciones: string[];
	alternativas: string[];
};

type Unica = {
	tipo: 'unica';
	texto: string;
	alternativas: string[];
};

type Booleana = {
	tipo: 'booleana';
	texto: string;
};

type Abierta = {
	tipo: 'abierta';
	texto: string;
	tamaño: 'largo' | 'chico';
};

type Titulo = {
	indice: number;
	tipo: 'titulo';
	texto: string;
};

type Item = Multiple | Unica | Booleana | Abierta | Titulo;
