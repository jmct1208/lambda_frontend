import { Component, OnInit } from '@angular/core';
import { Alumno} from '../../modelos/alumno';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServicioAlumno } from '../../servicios/alumno.service';

import Swal from 'sweetalert2';
import { Usuario } from 'src/app/modelos/usuario';
declare var $: any;

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  alumnos: Alumno[] | any;
  usuarios: Usuario[] | any;
  alumno: Alumno | any;
  alumnoForm!: FormGroup;
  submitted = false;
  modalTitle!: String;
  tipoUsuarioSelec!: number;
  constructor(private servicioAlumno: ServicioAlumno,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.alumnoForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha: ['', Validators.required],
      fotografia: ['', Validators.required],
      actividad: ['', Validators.required],
      grado: ['', Validators.required],
      seguro: ['', Validators.required],
      certificado: ['', Validators.required],
      carta: ['', Validators.required],
      usuario: ['', Validators.required]
    });
    //this.tipoUsuarioSelec=0;
    // Consulte lista alumnos
    this.getAlumnos(); 
  }

  getUsuariosSinAlumno(){
    this.usuarios=[];
    this.servicioAlumno.getUsuariosSinAlumno().subscribe(
      resp => {
        this.usuarios=resp;
        console.log(this.usuarios)
      }
    )
  }

  // Consultar lista de alumnos
  getAlumnos(){
    this.alumnos = [];
    this.servicioAlumno.getAlumnos().subscribe(
      res => {
        this.alumnos = res;
        console.log(this.alumnos)
        this.getUsuariosSinAlumno();
      },
      err => console.error(err)
    )
  }
  
  cerrarModal(){
    this.submitted=false;
  }
  
  convertFileImg(event: any){
    var pdftobase64 = function(file: File,form: FormGroup){
      Swal.fire({
        title: 'Espera un momento!',
        html: 'La imagen se está cargando',// add html attribute if you want or remove
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        form.controls['fotografia'].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function (error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0],this.alumnoForm);
  }
  
  convertFileCertificado(event: any){
    var pdftobase64 = function(file: File,form: FormGroup){
      Swal.fire({
        title: 'Espera un momento!',
        html: 'el archivo PDF se está cargando',// add html attribute if you want or remove
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        form.controls['certificado'].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function (error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0],this.alumnoForm);
  }
  
  convertFileCarta(event: any){
    var pdftobase64 = function(file: File,form: FormGroup){
      Swal.fire({
        title: 'Espera un momento!',
        html: 'el archivo PDF se está cargando',// add html attribute if you want or remove
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        form.controls['carta'].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function (error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0],this.alumnoForm);
  }

  convertFileSeguro(event: any){
    var pdftobase64 = function(file: File,form: FormGroup){
      Swal.fire({
        title: 'Espera un momento!',
        html: 'el archivo PDF se está cargando',// add html attribute if you want or remove
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        form.controls['seguro'].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function (error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0],this.alumnoForm);
  }

  // Eliminar una alumno
  deleteAlumno(id:number){
    Swal.fire({
      title: 'Eliminar Alumno!',
      text: 'Estás seguro que deseas eliminar a la alumno?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioAlumno.deleteAlumno(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'La alumno ha sido eliminada',
              'success'
            )
            this.getAlumnos();
          },
          err => console.error(err)
        )
      }
    });
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

  showExamenes() {
    
  }
  // Crear una alumno
  onSubmit(){
    this.submitted = true;
    /*
    if(this.tipoUsuarioSelec==0){
          Swal.fire({
            icon: 'error',
            title: 'Usuario No Ingresado',
            text: 'Ingresa un usuario'
          })

      return;
    }
    */
    if(this.alumnoForm.invalid){
      console.log(this.alumnoForm.value);
      console.log('Formulario inválido');
      return;
    }
    //this.convertImage(this);
    if(this.modalTitle == "Registrar"){
      let alumno = new Alumno(
        this.alumnoForm.controls['id'].value,
        this.alumnoForm.controls['nombre'].value,
        this.alumnoForm.controls['apellidos'].value,
        this.alumnoForm.controls['fecha'].value,
        this.alumnoForm.controls['fotografia'].value,
        this.alumnoForm.controls['actividad'].value,
        this.alumnoForm.controls['grado'].value,
        this.alumnoForm.controls['seguro'].value,
        this.alumnoForm.controls['certificado'].value,
        this.alumnoForm.controls['carta'].value
      )
      console.log(alumno);
      this.servicioAlumno.createAlumno(alumno,this.alumnoForm.controls['usuario'].value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La alumno ha sido registrada',
            showConfirmButton: false,
            timer: 1500
          })
          $("#alumnoModal").modal("hide");
          this.getAlumnos();
          this.submitted = false;
          this.tipoUsuarioSelec=0;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.alumnoForm.value);
      this.servicioAlumno.updateAlumno(this.alumnoForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La alumno ha sido actualizada',
            showConfirmButton: false,
            timer: 1500
          })
          $("#alumnoModal").modal("hide");
          this.getAlumnos();
          this.submitted = false;
          this.tipoUsuarioSelec=0;
        },
        err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al conectar con el servidor'
          })
        }
      )
    }
  }

  // Actualizar una alumno
  updateAlumno(alumno: Alumno){
    this.submitted = true;
    //this.tipoUsuarioSelec=
    this.alumnoForm.controls['id'].setValue(alumno.id);
    this.alumnoForm.controls['nombre'].setValue(alumno.nombre);
    this.alumnoForm.controls['apellidos'].setValue(alumno.apellidos);
    this.alumnoForm.controls['fecha'].setValue(alumno.fecha);
    this.alumnoForm.controls['fotografia'].setValue(alumno.fotografia);
    this.alumnoForm.controls['actividad'].setValue(alumno.actividad);
    this.alumnoForm.controls['grado'].setValue(alumno.grado);
    this.alumnoForm.controls['seguro'].setValue(alumno.seguro);
    this.alumnoForm.controls['certificado'].setValue(alumno.certificado);
    this.alumnoForm.controls['carta'].setValue(alumno.carta);
    this.modalTitle = "Actualizar";
    $("#alumnoModal").modal("show");

    
  }

  get f() { return this.alumnoForm.controls;}

  openModalAlumno(){
    this.alumnoForm.reset();
    this.modalTitle = "Registrar"
    $("#alumnoModal").modal("show");
  }

}
