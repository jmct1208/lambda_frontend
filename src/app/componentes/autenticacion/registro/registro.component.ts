import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../../servicios/usuario.service';
import {Usuario} from '../../../modelos/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
/*
  constructor( private usrservices: UsuarioService ) { }
  private user: Usuario ={
    id:"",
    password:"",
    tipo:false
  };


  onRegister():void {
    this.usrservices.createUsuario(this.user)
  }
*/
  constructor( ) { }

  ngOnInit(): void {
  }
}
