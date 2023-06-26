import { Component, OnInit } from '@angular/core';
import { Skills } from 'src/app/model/skills';
import { SkillsService } from 'src/app/service/skills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit{
  skill: Skills[] = [];
  nombreSk: string = '';
  porcentaje: number = 0;

  editSkills: boolean=false;
  backSkills: boolean=true;

  editForm : boolean = false;
  hiddeTable : boolean = true;

  constructor(private skillsService: SkillsService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.listarSkills();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  listarSkills(): void{
    this.skillsService.lista().subscribe(
      data => {
        this.skill = data;
        console.log(this.skill)
      }
    )
  }

  /*Boton de editar seccion habilidades*/

  editarSkills(): void {
    this.editSkills = true;
    this.backSkills = false
    this.hiddeTable = true;
    console.log(this.editSkills)
  }

  returnSkills(): void {
    this.editSkills = false;
    this.backSkills = true;
    this.editForm = false;
    console.log(this.editSkills)
  }

  /* Boton de agregar nueva skills*/

  nuevoForm(): void{
    this.editForm=true;
    this.hiddeTable = false;

  }

  /*Crear Registro Skills*/

  onCreate(): void{
    const sk = new Skills(this.nombreSk, this.porcentaje);

    this.skillsService.save(sk).subscribe(
      data =>{
        this.editForm = false;
        this.hiddeTable=true;
        window.location.href="/"
        console.log(true)
      }, err=>{
        //alert(err.error.mensaje);
        console.log("Fallo");
      }

    )
  }

  delete(id?:number){
    //alert(id)
    if(id != undefined){
      this.skillsService.delete(id).subscribe(
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
