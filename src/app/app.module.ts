import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideComponent } from './components/slide/slide.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { HomePageComponent } from './home-page/home-page.component';

import {RouterModule, Routes} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { EditEducacionComponent } from './components/educacion/edit-educacion/edit-educacion.component';
import { EditProyectoComponent } from './components/proyectos/edit-proyecto/edit-proyecto.component';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia/edit-experiencia.component';
import { EditSkillsComponent } from './components/skills/edit-skills/edit-skills.component';

const appRoutes:Routes=[
  {path:'', component:HomePageComponent},
  {path:'Login', component:LoginPageComponent},
  {path:'editar-experiencia/:id', component: EditExperienciaComponent},
  {path:'editar-educacion/:id', component: EditEducacionComponent},  
  {path:'editar-skills/:id', component: EditSkillsComponent},
  {path:'editar-proyecto/:id', component: EditProyectoComponent}
];

@NgModule({
  declarations: [
    AppComponent,    
    SlideComponent,
    DatosPersonalesComponent,
    ExperienciaComponent,
    EducacionComponent,
    SkillsComponent,
    ProyectosComponent,    
    HomePageComponent, LoginPageComponent, EditEducacionComponent, EditProyectoComponent, EditExperienciaComponent, EditSkillsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgCircleProgressModule.forRoot({
      // set defaults here
      "radius": 60,      
      "unitsFontSize": "17",
      "unitsFontWeight": "500",
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#393db1",
      "innerStrokeColor": "#7284df",
      "innerStrokeWidth": 5,
      "titleFontSize": "22",
      "titleFontWeight": "500",
      "subtitleFontSize": "13",
      "subtitleFontWeight": "900",
      "showBackground": false,  
    }),
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
