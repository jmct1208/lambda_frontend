import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import swal from "sweetalert2";
import {LoginService} from "../../servicios/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements DoCheck {
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