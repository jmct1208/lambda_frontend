import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URI = 'http://localhost:8080';
  status = false;

  constructor(private http: HttpClient, private router: Router) { }

  autenticar(datos_formulario: any) {
    return this.http.post<any>(this.API_URI + '/api/autenticacion/login', datos_formulario);
  }

  isLoggedIn() {
    if(localStorage.getItem('token')) {
       return true; 
    } 
    return false;
  }

  loggedIn(usuario: any, res: any) {
    localStorage.setItem('login', 'true');
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('token', res.token);
  }

  logout() {
    localStorage.clear();
    localStorage.setItem('login', 'false');
  }
}
