import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/servicios/registro.service';
import { first } from 'rxjs/operators';
import { Usuario } from '../../../modelos/usuario';

import swal from 'sweetalert2';
import { TipoEvento } from 'src/app/modelos/tipoEvento';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm!: FormGroup
  tipos: TipoEvento[] | any;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private registroService: RegistroService,
  ) { }

  ngOnInit(): void {

    // Validar longitud de contraseña de al menos 8 caracteres y que email corresponda a una sintaxis válida
    this.registroForm = this.formBuilder.group(
      {
        'nombre' : [null, [Validators.required]],
        'password': [null, [Validators.required, Validators.minLength(8)]],
        'tipo': [null, [Validators.required]]
      }
    );
    //this.tipos=[new TipoEvento(2,"ALUMNO","No tiene acceso a todas las funciones"),new TipoEvento(1,"ADMINISTRADOR","Tiene acceso a todas las funciones")]
    this.registroService.getTiposUsuario().subscribe(
      res => {
        this.tipos = res;
        console.log(this.tipos);
      },
      err => console.error(err)
    );
  }

  camposInvalidos(){
    const campos_invalidos = []
    const controles = this.registroForm.controls
    for (const nombre_control in controles){
      if(controles[nombre_control].invalid){
        campos_invalidos.push(nombre_control)
      }
    }
    return campos_invalidos
  }

  onSubmit(){
    /*
    if(this.tipoUsuarioSelec==2){
    this.tipoEvento= new TipoEvento(2,"USUARIO","No tiene acceso a todas las funciones");
    const rjson=JSON.stringify(this.tipoEvento);
    const ojson=JSON.parse(rjson);
    this.registroForm.controls['tipo'].setValue(ojson);
    }else{
      if(this.tipoUsuarioSelec==1){
        this.tipoEvento= new TipoEvento(1,"ADMINISTRADOR","Tiene acceso a todas las funciones");
        const rjson=JSON.stringify(this.tipoEvento);
        const ojson=JSON.parse(rjson);
        this.registroForm.controls['tipo'].setValue(ojson);
      }
    }
    */
    // Manejar el caso de que la forma sea invalida. En este caso que los campos esten vacios
    if(this.registroForm.invalid){
      console.log(this.registroForm.value);
      let campos_invalidos = this.camposInvalidos()
      if (campos_invalidos.includes("nombre")){
        swal.fire(
          {
            title: 'El nombre es invalido.',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }
      else if (campos_invalidos.includes("password")){
        swal.fire(
          {
            title: 'La contraseña debe ser al menos de 8 caracteres.',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }
      else {
        swal.fire(
          {
            title: 'Todos los campos son obligatorios',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }
      return
    }else{
      console.log(this.registroForm.value);
      let usuario = new Usuario(
        this.registroForm.controls['nombre'].value,
        this.registroForm.controls['password'].value
      );
        console.log(usuario);
      this.registroService.registrar(usuario, this.registroForm.controls['tipo'].value).pipe(first())
        .subscribe(res => {
            swal.fire({
              title: 'Usuario creado exitosamente .',
              text: "Ya puedes iniciar sesión",
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            console.log(usuario);
            this.router.navigate(['login']);

          },
          err => {
            swal.fire({
              title: 'Algo ha salido mal.',
              text: "Por favor intentalo nuevamente",
              icon: 'error',
              confirmButtonText: 'Ok'
            });
            console.log(err);
          }
        );
    }
  }




}
