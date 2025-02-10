type TipoPregunta = 'seleccion_unica' | 'seleccion_multiple' | 'booleana' | 'abierta';

type PreguntaMultiple = { texto: string; opciones: string[]; alternativas: string[] };
type PreguntaUnica = { texto: string; alternativas: string[] };
type PreguntaBooleana = { texto: string; alternativas: ['Verdadero', 'Falso'] };
type PreguntaAbierta = { texto: string; tamaño: 'largo' | 'chico' };

type Pregunta = PreguntaMultiple | PreguntaUnica | PreguntaBooleana | PreguntaAbierta;

type Item = {
    tipo: 'libre' | 'fijo';
    tipoFijo?: TipoPregunta; // Solo se usa si el ítem es "fijo"
    preguntas: Pregunta[];
};
