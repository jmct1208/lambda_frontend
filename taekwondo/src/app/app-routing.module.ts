import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent} from './componentes/alumno/alumno.component';
import { TipoEventoComponent } from './components/tipo-evento/tipo-evento.component';
import {HomeComponent} from "./components/home/home.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
