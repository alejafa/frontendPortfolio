import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';
import {Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {
  proyecto ? : Proyecto;

  titulo:string='';
  url : string='';
  descripcion: string='';
  imagenProject:string='';

  urlImg:string = '';
  urlImage:string='';
  nombreImg:string=''; 

  isLogged: boolean = false;

  constructor(
    private proyectoService: ProyectoService, 
    private activatedRouter: ActivatedRoute,
    private tokenService: TokenService, 
    private storage: Storage
  ){}

  ngOnInit(): void{
    if(this.tokenService.getToken()){
      this.isLogged = true;      
    }else{
      this.isLogged = false;
      window.location.href="/"
    }
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoService.detail(id).subscribe(
      data =>{
        //console.log(data)
        this.proyecto = data;
        this.titulo = this.proyecto.titulo;
        this.url = this.proyecto.url;
        this.descripcion = this.proyecto.descripcion;
      }, err =>{
         alert("Error al modificar");         
      }
    )

  }

  onUpdate():void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.imagenProject = this.urlImage;

    const proyecto = new Proyecto(this.titulo, this.descripcion, this.url, this.imagenProject);
    console.log(proyecto);

    this.proyectoService.update(id, proyecto).subscribe(
      data=>{
        alert("Registro proyecto actualizado");
        window.location.href="/";
      },err=>{
        alert("Fallo al actualizar proyecto");
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
    const imgRef = ref(this.storage, `imagen/proyecto/` + nameImg);    
    uploadBytes(imgRef, file)
    .then(resp =>{this.getImages()})
    .catch(error=>console.log(error))  
   }

  getImages(){
    const imagenRef = ref(this.storage, 'imagen/proyecto');
    list(imagenRef)
    .then(async response=>{
      //console.log(response.items);
      for(let item of response.items){
        this.urlImg = await getDownloadURL(item);
        //console.log(this.urlImg);
        //console.log(this.nombreImg);
        //console.log(this.url.includes(this.nombreImg));
        if(this.urlImg.includes(this.nombreImg)){
          this.urlImage = this.urlImg;
          console.log("la url es: " + this.urlImg)
        }        
      }
    })
    .catch(error=>console.log(error))
  }

}
