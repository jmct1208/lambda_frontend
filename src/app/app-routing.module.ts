import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlumnoComponent} from './componentes/alumno/alumno.component';
import {ExamenComponent} from './componentes/examen/examen.component';
import {HomeComponent} from './componentes/home/home.component';
import {LoginComponent} from './componentes/autenticacion/login/login.component';
import {RegistroComponent} from './componentes/autenticacion/registro/registro.component';
import {EventoComponent} from './componentes/evento/evento.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'alumno', component: AlumnoComponent},
  {path: 'examen', component: ExamenComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'evento', component: EventoComponent},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }