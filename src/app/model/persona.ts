export class Persona {
	id?:number;
	nombre: String;
	apellido: String;
	descripcion : String;
	nombreUsuario:String;
	email:String;
	profesion: String;
	imagen : String;
	password:String;

	constructor(nombre: String, apellido: String, descripcion: String, nombreUsuario: String, email: String, password: String, profesion: String, imagen: String){
        this.nombre = nombre;
        this.apellido = apellido;
        this.descripcion = descripcion;
        this.nombreUsuario=nombreUsuario;
        this.email = email;
        this.password = password;        
        this.profesion = profesion;
        this.imagen = imagen;
    }
}
