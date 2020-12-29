import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Examen} from '../modelos/examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  API_URI = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  addAlumno(idExamen: number,idAlumno:number){
    return this.http.put(this.API_URI+'/examenes/'+idExamen+'/alumnos/'+idAlumno, null);    
  } 

  eliminarAlumnoExamen(idExamen: number, idAlumno:number){
    return this.http.delete(this.API_URI+'/examenes/'+idExamen+'/alumnos/'+idAlumno);
  }
  
  getAlumnosExamen(id: number){
    return this.http.get(this.API_URI+'/examenes/'+id+'/alumnos');
  }

  getAlumnosNotExamen(id: number) {
    return this.http.get(this.API_URI+'/examenes/'+id+'/not_alumnos');
  }

  getExamenes(){
    return this.http.get(this.API_URI+'/examenes');
  }

  getExamen(id: number){
    return this.http.get(this.API_URI+'/examenes/'+id);
  }

  createExamen(examen: Examen){
    console.log(examen);
    return this.http.post(this.API_URI+'/examenes',examen);
  }

  updateExamen(examen: Examen){
    return this.http.put(this.API_URI+'/examenes/'+ examen.id,examen);
  }

  deleteExamen(id: number){
    return this.http.delete(this.API_URI+'/examenes/'+id);
  }

  getExamenesAlumnoLogueado() {
    return this.http.get(this.API_URI+'/logged_in/alumno/eventos');
  }
}
