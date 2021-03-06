import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlumnoComponent} from './componentes/alumno/alumno.component';
import { EventoComponent } from './componentes/evento/evento.component';
import {ExamenComponent} from './componentes/examen/examen.component';
import {RestringirService} from './servicios/restringir.service';
import {HomeComponent} from './componentes/home/home.component';
import {LoginComponent} from './componentes/autenticacion/login/login.component';
import {RegistroComponent} from './componentes/autenticacion/registro/registro.component';
import { TipoEventoComponent } from './componentes/tipo-evento/tipo-evento.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import {InfoComponent} from './componentes/info/info.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'alumno', component: AlumnoComponent},
  {path: 'examen', component: ExamenComponent},
  {path: 'login', component: LoginComponent,canActivate:[RestringirService]},
  {path: 'registro', component: RegistroComponent},
  {path: 'evento', component: EventoComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'tipos_evento', component: TipoEventoComponent},
  {path: 'info', component: InfoComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
