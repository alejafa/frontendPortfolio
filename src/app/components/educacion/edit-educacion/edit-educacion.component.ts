import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';
import {Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit{

  educacion ?:Educacion;

  nombreEd: string = '';
  tituloEd: string = '';
  descripcionEd: string = '';
  imagenEd: string = '';

  url: string ='';
  urlImage: string  ='';
  nombreImg: string ='';

   isLogged: boolean = false;

  constructor(
    private educacionService: EducacionService, 
    private activatedRouter: ActivatedRoute,
    private tokenService: TokenService, 
    private storage: Storage
  ){}


  ngOnInit():void{

    if(this.tokenService.getToken()){
      this.isLogged = true;      
    }else{
      this.isLogged = false;
      window.location.href="/"
    }


    const id = this.activatedRouter.snapshot.params['id'];
    this.educacionService.detail(id).subscribe(
      data =>{
        //console.log(data)
        this.educacion = data;
        this.nombreEd = this.educacion.nombreEd;
        this.tituloEd = this.educacion.tituloEd;
        this.descripcionEd = this.educacion.descripcionEd;        
        //console.log(this.educacion.tituloEd);        
      }, err =>{
         alert("Error al modificar");         
      }
    )
  }

  onUpdate(): void{

    const id = this.activatedRouter.snapshot.params['id'];

    this.imagenEd = this.urlImage;

    const educacion = new Educacion(this.nombreEd, this.tituloEd, this.descripcionEd,this.imagenEd);

    console.log(educacion)
    this.educacionService.update(id, educacion).subscribe(
      data=>{
        alert("Registro Educación actualizada");
        window.location.href='/';
      }, err=>{
        alert("Fallo al actualizar");
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
    list(imagenRef)
    .then(async response=>{
      console.log(response.items);
      for(let item of response.items){
        this.url = await getDownloadURL(item);
        //console.log(this.url);
        //console.log(this.nombreImg);
        //console.log(this.url.includes(this.nombreImg));
        if(this.url.includes(this.nombreImg)){
          this.urlImage = this.url;
          console.log("la url es: " + this.url)
        }        
      }
    })
    .catch(error=>console.log(error))
  }
}
