export class Experiencia {
	id?: number;
	tituloEx : string;
	descripcionEx : string;

	constructor(tituloEx: string, descripcionEx: string){
		this.tituloEx = tituloEx;
		this.descripcionEx = descripcionEx;
	}
}
