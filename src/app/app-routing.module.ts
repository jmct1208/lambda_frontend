import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlumnoComponent} from './componentes/alumno/alumno.component';
import { EventoComponent } from './componentes/evento/evento.component';
import {ExamenComponent} from './componentes/examen/examen.component';
import { TipoEventoComponent } from './componentes/tipo-evento/tipo-evento.component';


const routes: Routes = [
  {path: '', component: AlumnoComponent},
  {path: 'alumnos', component: AlumnoComponent},
  {path: 'examenes', component: ExamenComponent},
  {path: 'eventos', component: EventoComponent},
  {path: 'tipos_evento', component: TipoEventoComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
