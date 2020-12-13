import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamenComponent } from './componentes/examen/examen.component';
import { EventoComponent } from './componentes/evento/evento.component';
import localeESMX from '@angular/common/locales/es-MX'
import { registerLocaleData } from '@angular/common';
import { TipoEventoComponent } from './componentes/tipo-evento/tipo-evento/tipo-evento.component'

registerLocaleData(localeESMX);

@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    ExamenComponent,
    EventoComponent,
    TipoEventoComponent
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
