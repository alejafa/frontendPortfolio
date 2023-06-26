export class Skills {
	id?:number;
	nombreSk: string;
	porcentaje: number;

	constructor(nombreSk: string, porcentaje: number){
		this.nombreSk = nombreSk;
		this.porcentaje = porcentaje;
	}

}
