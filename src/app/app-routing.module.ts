import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlumnoComponent} from './componentes/alumno/alumno.component';
import {ExamenComponent} from './componentes/examen/examen.component';
import { EventoComponent } from './componentes/evento/evento.component';

const routes: Routes = [
  {path: '', component: AlumnoComponent},
  {path: 'evento', component: EventoComponent},
  {path: 'alumno', component: AlumnoComponent},
  {path: 'examen', component: ExamenComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
