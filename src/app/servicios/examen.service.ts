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
    return this.http.get(this.API_URI+'/examenes/'+idExamen+'/alumnos/add/'+idAlumno);    
  } 

  eliminarAlumnoExamen(idExamen: number,idAlumno:number){
    return this.http.get(this.API_URI+'/examenes/'+idExamen+'/alumnos/delete/'+idAlumno);
  }
  
  getAlumnosExamenes(id: number){
    return this.http.get(this.API_URI+'/examenes/'+id+'/alumnos');
  }

  getExamenes(){
    return this.http.get(this.API_URI+'/examenes');
  }

  getExamen(id: number){
    return this.http.get(this.API_URI+'/examen/'+id);
  }

  createExamen(examen: Examen){
    console.log(examen);
    return this.http.post(this.API_URI+'/examenes',examen);
  }

  updateExamen(examen: Examen){
    return this.http.put(this.API_URI+'/examen/'+examen.id,examen);
  }

  deleteExamen(id: number){
    return this.http.delete(this.API_URI+'/examen/'+id);
  }
}
