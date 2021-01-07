import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { TipoEvento } from '../modelos/tipoEvento';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  API_URI = 'http://localhost:8080/api/autenticacion/registro';
  status = false

  constructor(private http: HttpClient) { }

  registrar(datos_formulario: Usuario, idRol: number){
    return this.http.post(this.API_URI + '/' + idRol, datos_formulario);
  }

  getTiposUsuario() {
    return this.http.get(this.API_URI + '/tipos_usuario');
  }
  
}
