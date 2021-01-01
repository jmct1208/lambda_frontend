import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';

declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] | any;
  usuariosNotAlumno: Usuario[] | any;


  constructor(private servicioUsuario: UsuarioService, private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarios = [];
    this.servicioUsuario.getUsuarios().subscribe(
      res=> {
        this.usuarios = res;
        console.log(this.usuarios);
      },
      err=> console.error(err)
    );
  }
}
