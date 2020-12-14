import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/servicios/registro.service';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';

import swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private registroService: RegistroService,
  ) { }

  ngOnInit(): void {

    // Validar longitud de contraseña de al menos 8 caracteres y que email corresponda a una sintaxis válida
    this.registroForm = this.formBuilder.group(
      {
        'email' : [null, [Validators.required, Validators.email]],
        'password': [null, [Validators.required, Validators.minLength(8)]],
        'id_tipo_usuario': [null, [Validators.required]]
      }
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

    // Manejar el caso de que la forma sea invalida. En este caso que los campos esten vacios
    if(this.registroForm.invalid){
      let campos_invalidos = this.camposInvalidos()
      if (campos_invalidos.includes("email")){
        swal.fire(
          {
            title: 'El correo es invalido.',
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
      this.registroService.registrar(this.registroForm.value).pipe(first())
        .subscribe(res => {
            swal.fire({
              title: 'Usuario creado exitosamente .',
              text: "Ya puedes iniciar sesión",
              icon: 'success',
              confirmButtonText: 'Ok'
            });
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
