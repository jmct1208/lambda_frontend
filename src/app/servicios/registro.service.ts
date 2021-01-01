import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { TipoEvento } from '../modelos/tipoEvento';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  API_URI = 'http://localhost:8080';
  status = false

  constructor(private http: HttpClient) { }

  registrar(datos_formulario: Usuario, idRol: number){
    return this.http.post(this.API_URI + '/api/autenticacion/registro/'+idRol, datos_formulario);
  }

  getTiposUsuario() {
    return this.http.get<TipoEvento[]>(this.API_URI + '/api/autenticacion/tipos_usuario')
  }
}
