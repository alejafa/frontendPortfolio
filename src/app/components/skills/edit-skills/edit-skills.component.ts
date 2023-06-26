import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Skills } from 'src/app/model/skills';
import { SkillsService } from 'src/app/service/skills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.css']
})
export class EditSkillsComponent implements OnInit{
  skills?: Skills;
  nombreSk: string = ''
  porcentaje: number = 0

  isLogged: boolean = false;

  constructor(
    private skillService: SkillsService,
    private activatedRouter: ActivatedRoute,
    private tokenService: TokenService,
    ) {}

  ngOnInit(): void{
     if(this.tokenService.getToken()){
      this.isLogged = true;      
    }else{
      this.isLogged = false;
      window.location.href="/"
    }

    const id = this.activatedRouter.snapshot.params['id'];
    this.skillService.detail(id).subscribe(
      data => {
        this.skills = data;
        this.nombreSk = this.skills.nombreSk;
        this.porcentaje = this.skills.porcentaje;
        console.log(this.skills);
      }, err => {
        alert("Error al modificar");        
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];

    const skill = new Skills(this.nombreSk, this.porcentaje);

    this.skillService.update(id, skill).subscribe(
      data=>{
        alert('Registro de Skills actualizada')
        window.location.href="/";
      },err=>{
        alert("Fallo al actualizar")
      }
    )
  }

}
