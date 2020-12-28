import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import swal from 'sweetalert2'; 

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router,  private loginService: LoginService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');
        if (token) {
          request = request.clone({
            setHeaders: {
              'Authorization': 'Bearer ' + token
            }
          });
        }
        if (!request.headers.has('Content-Type')) {
          request = request.clone({
            setHeaders: {
              'content-type': 'application/json'
            }
          });
        }
        request = request.clone({
          headers: request.headers.set('Accept', 'application/json')
        });
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              console.log('event--->>>', event);
            }
            return event;
          }),
          catchError((error: HttpErrorResponse): Observable<any> => {
            console.log('Error -> error: ' + error.error + ' status: ' + error.status + ' statusText: '+ error.statusText + ' type: ' + error.type)
            if (error.status === 400) {
                swal.fire({
                    title: 'Error no definido.',
                    text: error.error,
                    icon: 'error',
                    });
                    return of(error.message);
              return of(error.message);
            }
            if (error.status === 401) {
              swal.fire({
                title: 'Error no definido.',
                text: error.error,
                icon: 'error',
                });
                return of(error.message);
              this.router.navigate(['login']);
              return of(error.message);
            }
            else if (error.status === 403) {
                swal.fire({
                    title: 'Error no definido.',
                    text: error.error,
                    icon: 'error',
                    });
                    return of(error.message);
              this.router.navigate(['']);
              return of(error.message);
            }
            else if (error.status === 404) {
                swal.fire({
                    title: 'Error no definido.',
                    text: error.error,
                    icon: 'error',
                    });
                    return of(error.message);
              return of(error.message);
            }
            else if(error.statusText.includes("Unknown")){
                swal.fire({
                    title: 'Error no definido.',
                    text: error.error,
                    icon: 'error',
                    });
                    return of(error.message);
              return of(error.message);
            }
            else if (error.status === 412){
              this.router.navigate(['login']);
              this.loginService.logout();
              swal.fire({
                title: 'Sesión. expirada. Error: no autorizado.',
                text: error.error,
                icon: 'warning',
                });
              return of(error.message);
            }else{
                swal.fire({
                title: 'Error no definido.',
                text: error.error,
                icon: 'error',
                });
                return of(error.message);
            }
            
             throw error;
          }));
    }

}