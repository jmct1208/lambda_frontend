import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamenComponent } from './componentes/examen/examen.component';
import { EventoComponent } from './componentes/evento/evento.component';
import {HomeComponent} from './componentes/home/home.component';
import { LoginComponent } from './componentes/autenticacion/login/login.component';
import { RegistroComponent } from './componentes/autenticacion/registro/registro.component';

import { TipoEventoComponent } from './componentes/tipo-evento/tipo-evento.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component'


@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    ExamenComponent,
    EventoComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    TipoEventoComponent,
    UsuarioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
