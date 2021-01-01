import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RestringirService implements CanActivate{

  constructor(private router: Router) { }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     if(localStorage.getItem('login')=='true'){
      swal.fire({
        title: 'Bloqueado',
        text: "Tu sesion esta abierta",
        icon: "error",
      });
      this.router.navigate(['']); 
      return false; 
     }
     return true
   }
}
