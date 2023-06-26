import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit{  
  experiencia?: Experiencia;  
  tituloEx : string = '';
  descripcionEx: string = '';

  isLogged: boolean = false;

  
  constructor(
    private experienciaService: ExperienciaService, 
    private tokenService: TokenService,     
    private activatedRouter: ActivatedRoute
  ){}  

  ngOnInit(): void{
    if(this.tokenService.getToken()){
      this.isLogged = true;      
    }else{
      this.isLogged = false;
      window.location.href="/"
    }
    const id = this.activatedRouter.snapshot.params['id'];    
    this.experienciaService.detail(id).subscribe(
      data=>{
        this.experiencia = data;
        this.tituloEx=this.experiencia.tituloEx;
        this.descripcionEx=this.experiencia.descripcionEx;
        console.log(this.descripcionEx);        
      }, err=>{
        alert("error")        
      }
    )        
  }  

  onUpdate(): void{

    const id = this.activatedRouter.snapshot.params['id'];    

    const experiencia = new Experiencia(this.tituloEx,this.descripcionEx);

    //console.log(experiencia);
    
    this.experienciaService.update(id, experiencia).subscribe(
      data=>{
        alert('Registro de experiencia actualizada');
        window.location.href="/";
      }, err=>{
        alert("Fallo al actualizar");
        //window.location.href="";
      }
    )

  }

}
