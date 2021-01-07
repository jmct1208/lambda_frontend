import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { Alumno } from '../modelos/alumno';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URI = 'http://localhost:8080/usuarios';
  constructor(private http: HttpClient) { }
  
  getUsuarios(nombre: string | null) {
    const options = nombre ?
      { params: new HttpParams().set('nombre', nombre) } : {}
    return this.http.get(this.API_URI, options);
  }

  getUsuario(id: number) {
    return this.http.get(this.API_URI + '/' + id)
  }

  getUsuariosSinAlumno() {
    return this.http.get(this.API_URI + '/sin_alumno')
  }

  getAlumno(id: number) {
    return this.http.get(this.API_URI + '/' + id + '/alumno')
  }

  createAlumno(alumno: Alumno, id:number){
    console.log(alumno);
    return this.http.post(this.API_URI + '/' + id + '/alumno', alumno);
  }

  updateUsuario(usuario: Usuario) {
    return this.http.put(this.API_URI+ '/' + usuario.id, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete(this.API_URI + '/' + id);
  }
}
