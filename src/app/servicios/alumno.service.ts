import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno} from '../modelos/alumno';

@Injectable({
  providedIn: 'root'
})
export class ServicioAlumno {
  API_URI = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAlumnos(){
    return this.http.get<Alumno[]>(this.API_URI+'/alumnos');
  }

  getAlumno(id: number){
    return this.http.get(this.API_URI+'/alumnos/'+id);
  }

  createAlumno(alumno: Alumno){
    console.log(alumno);
    return this.http.post(this.API_URI+'/alumnos/',alumno);
  }

  updateAlumno(alumno: Alumno){
    return this.http.put(this.API_URI+'/alumnos/'+alumno.id,alumno);
  }

  deleteAlumno(id: number){
    return this.http.delete(this.API_URI+'/alumnos/'+id);
  }

  getAlumnoLogueado() {
    return this.http.get(this.API_URI+'/usuarios/logged_in/alumno')
  }
}
