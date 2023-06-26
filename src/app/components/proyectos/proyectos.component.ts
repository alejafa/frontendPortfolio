import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';
import {Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{

  proyecto: Proyecto[] = [];

  titulo:string='';
  url: string='';
  descripcion: string='';    
  imagenProject: string='';

  urlprov: string = '';
  urlImage: string = '';

  nombreImg: string = '';


  editForm:boolean = false;
  isLogged: boolean = false;
  editProject: boolean = false;
  backProject: boolean = true;

  hiddeCrud: boolean = true;  

  constructor(private proyectoService: ProyectoService, private tokenService: TokenService, private storage: Storage){}

  ngOnInit():void{
    this.listarProyecto();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  listarProyecto(): void{
    this.proyectoService.lista().subscribe(
      data=>{
        this.proyecto = data;
        console.log(this.proyecto);
      },err=>{
        console.log("error en el registro proyecto")
      }
    )
  }

  editarProject() : void{
    this.editProject =true;
    this.backProject = false;
    this.hiddeCrud = true;

  }

  returnProject(): void{
    this.editProject = false;
    this.backProject = true;
    this.editForm = false;
  }

  nuevoForm():void{
    this.editForm=true;
    this.hiddeCrud = false;
    console.log(this.editForm);
  }

  onCreate(): void{
    this.imagenProject = this.urlImage;    

    const proy = new Proyecto(this.titulo, this.descripcion, this.url, this.imagenProject)

    console.log(proy)

    this.proyectoService.save(proy).subscribe(
      data=>{        
        this.editForm=false;
        this.hiddeCrud = true;
        alert('Registro de proyecto agregado');
        window.location.href='';
      }, err=>{
      console.log(err)        
        //alert(err.error.mensaje);
        alert("estamos en el error");
      }
    )
  }

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
      console.log(response.items);
      for(let item of response.items){
        this.urlprov = await getDownloadURL(item);
        //console.log("la url es: " + this.urlprov)
        if(this.urlprov.includes(this.nombreImg)){
          this.urlImage = this.urlprov;
        }
      }
    })
    .catch(error=>console.log(error))
  }


  delete(id?:number){
    //alert(id)
    if(id != undefined){
      this.proyectoService.delete(id).subscribe(
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




