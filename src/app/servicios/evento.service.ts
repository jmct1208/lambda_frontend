import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento} from '../modelos/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  API_URI = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  addAlumno(idEvento: number,idAlumno:number){
    return this.http.put(this.API_URI+'/eventos/'+idEvento+'/alumnos/'+idAlumno, null);    
  } 

  eliminarAlumnoEvento(idEvento: number,idAlumno:number){
    return this.http.delete(this.API_URI+'/eventos/'+idEvento+'/alumnos/'+idAlumno);
  }
  
  getAlumnosEvento(id: number){
    return this.http.get(this.API_URI+'/eventos/'+id+'/alumnos');
  }

  getAlumnosNotEvento(id: number) {
    return this.http.get(this.API_URI+'/eventos/'+id+'/not_alumnos');
  }

  getEventos(){
    return this.http.get(this.API_URI+'/eventos');
  }
  
  getTipoEvento(id: number){
    return this.http.get(this.API_URI+'/eventos/'+id+'/tipo_evento');

  }
  createEvento(evento: Evento, idTipoEvento: number){
    console.log(evento);
    return this.http.post(this.API_URI+'/eventos'+'/tipo_evento/'+idTipoEvento,evento);
  }

  updateEvento(evento: Evento, idTipoEvento: number){
    return this.http.put(this.API_URI+'/eventos/'+evento.id+'/tipo_evento/'+idTipoEvento,evento);
  }

  deleteEvento(id: number){
    return this.http.delete(this.API_URI+'/eventos/'+id);
  }

  getEventosAlumnoLogueado() {
    return this.http.get(this.API_URI+'/logged_in/alumno/eventos');
  }
}
