import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';
import {Storage, ref, uploadBytes, list, getDownloadURL} from '@angular/fire/storage';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit{
  persona : any;
  user: any;  
  isLogged : boolean = false;
  nombre: string='';
  apellido: string='';
  profesion : string = '';
  descripcion : string ='';
  imagen : string ='';
  url : string = '';



  constructor(private personaService : PersonaService, private storage: Storage){}


  ngOnInit():void{
    this.user= sessionStorage.getItem('AuthUsername');  

   //console.log(sessionStorage.getItem('AuthToken'));
    if(this.user){
      this.isLogged = true
      console.log(this.isLogged);  
    }     

    this.personaService.detail("aleja").subscribe(
      data=>{
        this.persona = data;        
        console.log(this.persona);
      }, err => {
        alert("No se pudo obtener el registro");        
      }
    )

  }
  
  onUpdatePerfil(): void{    
    const id = this.persona.id; 
    this.persona.imagen = this.url; 
    delete this.persona.roles; 
    console.log(this.persona)
    this.personaService.update(id,this.persona).subscribe(
      data=>{
        alert("Datos Personales actualizados");
        window.location.href="";  
      }, err=>{
        alert("Error al actualizar sus datos");
      }
    )
    
  }

  uploadImage(evt: any){    
    //console.log(evt.target.files[0]);
    const id = this.persona.id;    
    console.log(id)
    const name = "perfil_" + id;
    this.subirImage(evt, name)

  }

  subirImage(evt: any, name: string){
    const file = evt.target.files[0];
    const imgRef = ref(this.storage, `imagen/`+ name)
    uploadBytes(imgRef, file)
    .then(response =>{this.getImages()})
    .catch(error => console.log(error))
  }

  getImages(){
    const imagesRef = ref(this.storage, 'imagen')
    list(imagesRef)
    .then(async response =>{
      for(let item of response.items){
        this.url  = await getDownloadURL(item);
        console.log("la url es: " + this.url);
      }
    })
    .catch(error=>console.log(error))
  }
  

}
