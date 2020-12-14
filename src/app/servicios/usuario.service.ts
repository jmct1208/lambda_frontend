import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URI = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(this.API_URI+'/usuarios')
  }

  getAlumno(id: number) {
    return this.http.get(this.API_URI+'/usuarios/'+id+'/alumno')
  }

  createUsuario(usuario: Usuario) {
    return this.http.post(this.API_URI+'/usuarios', usuario);
  }

  updateUsuario(usuario: Usuario) {
    return this.http.put(this.API_URI+'/usuarios/'+usuario.id, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete(this.API_URI+'/usuarios/'+id);
  }
}