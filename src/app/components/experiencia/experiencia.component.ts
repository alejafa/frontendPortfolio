import { Component,  OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit{
  expe: Experiencia[] = [];
  tituloEx : string ='';
  descripcionEx : string ='';

  constructor(private experienciaService: ExperienciaService, private tokenService: TokenService){}

   isLogged : boolean = false;

   ngOnInit():void{
    //const user= sessionStorage.getItem('AuthUsername');
    this.listarExperiencia();
    if(this.tokenService.getToken()){
      this.isLogged = true;      
    }else{
      this.isLogged = false;
    }
   }

   listarExperiencia(): void{
    this.experienciaService.lista().subscribe(
      data=>{
        this.expe = data;
        console.log(this.expe);
      }
    )
   }

   onCreate(): void{
    const expe = new Experiencia(this.tituloEx, this.descripcionEx);
    //console.log(this.tituloEx)
    //console.log(this.descripcionEx)

    this.experienciaService.save(expe).subscribe(
      data =>{
        alert('Registro de experiencia agregada');
        window.location.href="";
      }, err=>{
        alert("Fallo el registro")
        window.location.href="";
      }

    )
   }

  delete(id?:number){
    //alert(id)
    if(id != undefined){
      this.experienciaService.delete(id).subscribe(
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
