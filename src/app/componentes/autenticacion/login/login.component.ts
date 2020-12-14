import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  email=''
  password=''
  constructor(private formBuilder: FormBuilder,
              private router: Router
  ) { }

  ngOnInit(): void {

    // Validar longitud de contraseña de al menos 8 caracteres y que email corresponda a una sintaxis válida
    this.loginForm = this.formBuilder.group(
      {
        'email' : [null, [Validators.required, Validators.email]],
        'password': [null, [Validators.required, Validators.minLength(8)]]
      }
    );
  }

  camposInvalidos(){
    const campos_invalidos = []
    const controles = this.loginForm.controls
    for (const nombre_control in controles){
      if(controles[nombre_control].invalid){
        campos_invalidos.push(nombre_control)
      }
    }
    return campos_invalidos
  }

  onSubmit(){
    // Manejar el caso de que la forma sea invalida. En este caso que los campos esten vacios
    if(this.loginForm.invalid){
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
    }
  }

}
