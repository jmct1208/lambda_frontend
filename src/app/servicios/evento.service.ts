import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento} from '../modelos/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  API_URI = 'http://localhost:8080/eventos';
  constructor(private http: HttpClient) { }

  getEventos(){
    return this.http.get(this.API_URI);
  }

  getEvento(id: number) {
    return this.http.get(this.API_URI + '/' + id);
  }

  getAlumnos(id: number){
    return this.http.get(this.API_URI+'/'+id+'/alumnos');
  }

  getAlumnosNotEvento(id: number) {
    return this.http.get(this.API_URI+'/'+id+'/not_alumnos');
  }
  
  updateEvento(evento: Evento){
    return this.http.put(this.API_URI + '/' + evento.id, evento);
  }

  updateTipoEvento(id: number, idTipoEvento: number) {
    return this.http.put(this.API_URI + '/' + id + '/tipo_evento', idTipoEvento);
  }

  addAlumno(idEvento: number,idAlumno:number){
    return this.http.put(this.API_URI+'/'+idEvento+'/alumnos/'+idAlumno, null);    
  } 

  eliminarAlumno(idEvento: number,idAlumno:number){
    return this.http.delete(this.API_URI+'/'+idEvento+'/alumnos/'+idAlumno);
  }

  deleteEvento(id: number){
    return this.http.delete(this.API_URI+'/'+id);
  }

}
