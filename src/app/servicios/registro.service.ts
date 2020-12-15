import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  API_URI = 'http://localhost:8080';
  status = false

  constructor(private http: HttpClient) { }

  registrar(datos_formulario: Usuario){
    return this.http.post(this.API_URI + '/api/autenticacion/registro', datos_formulario);
  }
}
