import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno} from '../modelos/alumno';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioAlumno {
  API_URI = 'http://localhost:8080/alumnos';
  constructor(private http: HttpClient) { }

  getAlumnos(){
    return this.http.get<Alumno[]>(this.API_URI);
  }

  getAlumno(id: number) {
    return this.http.get(this.API_URI + '/' + id);
  }

  getExamenes(id: number) {
    return this.http.get(this.API_URI + '/' + id + '/examenes');
  }

  getEventos(id: number) {
    return this.http.get(this.API_URI + '/' + id + '/eventos');
  }

  updateAlumno(alumno: Alumno){
    return this.http.put(this.API_URI + '/' + alumno.id, alumno);
  }

  updateUsuario(id: number, idUsuario: number) {
    return this.http.put(this.API_URI + '/' + id + '/usuario', { idUsuario: idUsuario} )
  }

  deleteAlumno(id: number){
    return this.http.delete(this.API_URI + '/' + id);
  }
  
}
