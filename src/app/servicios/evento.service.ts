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
    return this.http.get(this.API_URI+'/eventos/'+idEvento+'/alumnos/add/'+idAlumno);    
  } 

  eliminarAlumnoEvento(idEvento: number,idAlumno:number){
    return this.http.get(this.API_URI+'/eventos/'+idEvento+'/alumnos/delete/'+idAlumno);
  }
  
  getAlumnosEventoes(id: number){
    return this.http.get(this.API_URI+'/eventos/'+id+'/alumnos');
  }

  getEventoes(){
    return this.http.get(this.API_URI+'/evento');
  }

  getTipoEventoes(){
    return this.http.get(this.API_URI+'/tipoEvento');
  }
  
  getTipoEvento(id: number){
    return this.http.get(this.API_URI+'/tipoEvento'+id);

  }

  getEvento(id: number){
    return this.http.get(this.API_URI+'/evento/'+id);
  }

  createEvento(evento: Evento,idTipoEvento: number){
    console.log(evento);
    return this.http.post(this.API_URI+'/evento/'+idTipoEvento,evento);
  }

  updateEvento(evento: Evento){
    return this.http.put(this.API_URI+'/evento/'+evento.id,evento);
  }

  deleteEvento(id: number){
    return this.http.delete(this.API_URI+'/evento/'+id);
  }
}
