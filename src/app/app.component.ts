import { Component } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged = false;
  title = 'Alejandro Facone';  

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void{
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }



}
