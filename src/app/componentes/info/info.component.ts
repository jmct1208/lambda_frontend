import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import swal from "sweetalert2";
import {LoginService} from "../../servicios/login.service";
import {Router} from "@angular/router";
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/modelos/usuario';
import { Examen } from 'src/app/modelos/examen';
import { Evento } from 'src/app/modelos/evento';
import { switchMap } from 'rxjs/operators';
import { ServicioAlumno } from 'src/app/servicios/alumno.service';
import { Alumno } from 'src/app/modelos/alumno';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements DoCheck, OnInit {
  nombreUsuario!: String | any;
  isLogged!: boolean;
  usuario!: Usuario | any;
  alumno!: Alumno | any;
  examenes!: Examen[] | any;
  eventos!: Evento[] | any;

  @ViewChild('navbarToggler', {static: false}) navbarToggler!:ElementRef;

  constructor(private loginService: LoginService,
              private router: Router,
              private usuarioService: UsuarioService,
              private alumnoService: ServicioAlumno) { }

  ngOnInit() {
    if(this.loginService.isLoggedIn()) {
      this.nombreUsuario = localStorage.getItem('usuario');
      this.usuarioService.getUsuarios(this.nombreUsuario).pipe(
        switchMap( (user: Usuario | Usuario[]) => {
          this.usuario = user;
          return this.usuarioService.getAlumno((<Usuario>user).id);
        }),
        switchMap( (alumn: Alumno) => {
          this.alumno = alumn;
          return forkJoin([
            this.alumnoService.getEventos(alumn.id),
            this.alumnoService.getExamenes(alumn.id)]);
        })
      ).subscribe(
        lista => {
          this.eventos = lista[0];
          this.examenes = lista[1];
          console.log(this.usuario);
          console.log(this.alumno);
          console.log(this.examenes);
          console.log(this.eventos);
        },
        err => {
          console.log(err);
        }
      ); 
    }
  }

  ngDoCheck(){
    // Comportamiento si el usuario esta loggeado
    if(!this.loginService.isLoggedIn()) {
      this.nombreUsuario = undefined;
      this.usuario = undefined;
      this.alumno = undefined;
      this.eventos = undefined;
      this.examenes = undefined;       
    }
  }

  showPDF(pdf_base64: any){
    const linkSource = pdf_base64;
    const downloadLink = document.createElement("a");
    const fileName = "sample.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    return downloadLink;
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
