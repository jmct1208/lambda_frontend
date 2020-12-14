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
  usuarioForm!: FormGroup;
  roles: string[];


  constructor(private servicioUsuario: UsuarioService, private formBuilder: FormBuilder) { 
    this.roles = ["Usuario", "Administrador"];
  }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
     id: [''],
     nombre: ['', Validators.required],
     tipo: ['', Validators.required] 
    });
    

  }

}
