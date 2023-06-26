export class Proyecto {

	id?:number;
	titulo:string;
	descripcion: string;
	url: string;
	imagenProject: string;


	constructor(titulo:string, descripcion:string, url:string, imagenProject:string){
		this.titulo=titulo;
		this.descripcion=descripcion;
		this.url=url;
		this.imagenProject=imagenProject;
	}
}
