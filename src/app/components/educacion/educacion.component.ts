import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';
import {Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  educacion: Educacion[] = [];

  nombreEd: string = '';
  tituloEd: string = '';
  descripcionEd: string = '';
  imagenEd: string = '';

  url : string = '';
  urlImage: string  = '';

  nombreImg : string = '';

  editForm : boolean = false;
  isLogged: boolean = false;
  editEducation: boolean = false;
  backEducation: boolean=true;

  hiddeCrud: boolean=true;

  constructor(
    private educacionService: EducacionService, 
    private tokenService: TokenService, 
    private storage: Storage
  ){}

  ngOnInit():void{
    this.listarEducacion();
    if(this.tokenService.getToken()){
      this.isLogged = true;      
    }else{
      this.isLogged = false;
    }
  }

  listarEducacion(): void{
    this.educacionService.lista().subscribe(
      data=>{
        this.educacion = data;
        console.log(this.educacion);
      }
    )
  }

  editarEducation(): void{
    this.editEducation = true;
    this.backEducation = false;
    this.hiddeCrud = true;
  }

  returnEducation(): void{
    this.editEducation = false;
    this.backEducation = true;
    this.editForm = false;    
  }

  nuevoForm() : void{
     this.editForm=true;
     this.hiddeCrud = false;
     console.log(this.editForm);
  }

  onCreate(): void{   
    this.imagenEd = this.urlImage;

    const edu = new Educacion(this.nombreEd, this.tituloEd, this.descripcionEd, this.imagenEd);

    this.educacionService.save(edu).subscribe(
      data =>{        
         this.editForm=false;
         this.hiddeCrud=true;
         alert('Registro de educacion agregada');
        window.location.href="";
      }, err=>{        
         alert(err.error.mensaje);
        //alert("Fallo el registro")

        //window.location.href="";
      }

    )
   }  
   
   /*Subida de imagen a Firebase*/
   uploadImage(evt: any){
    this.nombreImg = evt.target.files[0].name;    
    this.subirImage(evt, this.nombreImg);
    //console.log(evt.target.files[0].name);
   }

   subirImage(evt: any, nameImg:string){
    const file = evt.target.files[0];
    const imgRef = ref(this.storage, `imagen/educacion/` + nameImg);
    uploadBytes(imgRef, file)
    .then(resp =>{this.getImages()})
    .catch(error=>console.log(error))  
   }

  getImages(){
    const imagenRef = ref(this.storage, 'imagen/educacion');
    //console.log(imagenRef)
    list(imagenRef)    
    .then(async response=>{
      console.log(response.items);
      for(let item of response.items){
        this.url = await getDownloadURL(item);        
        if(this.url.includes(this.nombreImg)){
          //console.log(this.url)
          this.urlImage = this.url;
        }
      }
    })
    .catch(error=>console.log(error))
  }

  delete(id?:number){
    //alert(id)
    if(id != undefined){
      this.educacionService.delete(id).subscribe(
        data=>{
          alert("Se ha eliminado el registro");
          window.location.href="/";
        }, err=>{
          alert("No se pudo eliminar el registro")
        }
      )
    }
  }

}
