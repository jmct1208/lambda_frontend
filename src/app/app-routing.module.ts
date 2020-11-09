import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlumnoComponent} from './componentes/alumno/alumno.component';


const routes: Routes = [
  {path: '', component: AlumnoComponent},
  {path: 'alumno', component: AlumnoComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
