import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError} from 'rxjs/operators'
import { Usuario} from '../modelos/usuario';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URI = 'http://localhost:8080/api/autenticacion/login';
  status = false;

  constructor(private http: HttpClient, private router: Router) { }

  autenticar(datos_formulario: any) {
    return this.http.post<any>(this.API_URI, datos_formulario);
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
