import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlumnoComponent} from './componentes/alumno/alumno.component';
import {ExamenComponent} from './componentes/examen/examen.component';


const routes: Routes = [
  {path: '', component: AlumnoComponent},
  {path: 'alumnos', component: AlumnoComponent},
  {path: 'examenes', component: ExamenComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
