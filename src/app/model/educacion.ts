export class Educacion {
	id?: number;
    nombreEd: string;
    tituloEd: string;
    descripcionEd: string;
    imagenEd: string;

    constructor(nombreEd: string, tituloEd: string, descripcionEd: string, imagenEd: string){
        this.nombreEd = nombreEd;
        this.tituloEd = tituloEd;
        this.descripcionEd = descripcionEd;
        this.imagenEd = imagenEd;
    }
}
