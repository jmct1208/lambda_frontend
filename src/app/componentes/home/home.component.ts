import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements DoCheck  {
  usuario!: String | any;
  isLogged!: boolean;

  @ViewChild('navbarToggler', {static: false}) navbarToggler!:ElementRef;

  constructor(private loginService: LoginService,
    private router: Router) { }
    ngDoCheck(){
      this.isLogged = this.loginService.isLoggedIn();


      // Comportamiento si el usuario esta loggeado
      if(this.isLogged){
        this.usuario = localStorage.getItem('usuario');
        this.usuario = this.usuario.substr(0, this.usuario.indexOf('@'));
      }
    }

    cerrarSesion(){
      swal.fire({
        title: 'Estas seguro que quieres salir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, salir!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['']);
          this.loginService.logout();
          swal.fire(
            'Sesión cerrada!',
            'Hasta pronto.',
            'success'
          )
          return this.loginService.logout();
        }


      })
    }

    navBarTogglerIsVisible() {
      return this.navbarToggler.nativeElement.offsetParent !== null;
    }

    collapseNav() {
      if (this.navBarTogglerIsVisible()) {
        this.navbarToggler.nativeElement.click();
      }
    }

}



