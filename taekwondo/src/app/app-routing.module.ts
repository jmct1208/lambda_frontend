import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent} from './componentes/alumno/alumno.component';
import { TipoEventoComponent } from './components/tipo-evento/tipo-evento.component';


const routes: Routes = [
  { path: '', component: AlumnoComponent},
  { path: 'alumno', component: AlumnoComponent},
  { path: 'tipoEvento', component: TipoEventoComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
