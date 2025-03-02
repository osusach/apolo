import type { Item, Prueba, Unica } from '$lib/types';
import { PageSizes, PDFDocument, PDFPage, StandardFonts } from 'pdf-lib';

let current_x = 0;
let current_y = 0;
let width: number;
let height: number;
let page: PDFPage;

const marginLeft = 20;
const verticalGap = 5;

const fontSize = 12;
const fontToEmbed = StandardFonts.Courier;
const pageSize = PageSizes.A4;
const debug = true;

function debugDivider() {
	if (!debug) return 0;
	page.drawLine({ start: { x: 0, y: current_y }, end: { x: width, y: current_y }, thickness: 1 });
	return 10;
}

function drawUnica(unica: Unica, idx: number) {
	page.drawText(idx.toString());
	page.drawText(unica.texto);
}

export const generate_pdf = async (prueba: Prueba) => {
	const pdfDoc = await PDFDocument.create();
	page = pdfDoc.addPage(pageSize);

	width = page.getWidth();
	height = page.getHeight();

	const font = await pdfDoc.embedFont(fontToEmbed);

	current_x = marginLeft;
	current_y = height - 50;
	page.drawText(prueba.nombre, {
		x: current_x,
		y: current_y,
		font: font,
		size: fontSize
	});

	prueba.contenido.forEach((item: Item, idx: number) => {
		if (item.tipo == 'unica') {
			drawUnica(item, idx);
		}
	});

	current_y -= verticalGap;

	current_y -= debugDivider();
	debugDivider();

	const pdfBytes = await pdfDoc.save();
	const blob = new Blob([pdfBytes], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	return url;
};
