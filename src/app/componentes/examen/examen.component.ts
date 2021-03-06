import { Component, OnInit } from '@angular/core';
import { Examen, fromFormValue, toRawFormValue} from '../../modelos/examen';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ExamenService } from '../../servicios/examen.service';
import { Alumno } from '../../modelos/alumno';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  alumnosExamen: Alumno[] | any;
  examenes: Examen[] | any;
  alumnosNotExamen: Alumno[] | any;
  examenSeleccionado: Examen | any;
  examenForm!: FormGroup;
  submitted = false;
  modalTitle!: String;
  modalTitle2!:string;
  modalTitle3!: String;
  constructor(private servicioExamen: ExamenService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.examenForm = this.formBuilder.group({
      id: [],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      costo: ['', Validators.required],
      enlace: ['', Validators.required],
      solicitud: ['', Validators.required],
    });
    this.getExamenes();
  }

  getExamenes(){
    this.examenes = [];
    this.servicioExamen.getExamenes().subscribe(
      res => {
        this.examenes = res;
        console.log(this.examenes)
      },
      err => console.error(err)
    )
  }

  openModalAgregarAlumnoExamen(examen: Examen){
       this.examenSeleccionado=examen;
       this.modalTitle3="agregarAlumno";
       this.getAlumnosNotExamen();
  }

  getAlumnosExamen() {
    this.alumnosExamen = [];
    this.servicioExamen.getAlumnosExamen(this.examenSeleccionado.id).subscribe(
      res => {
        this.alumnosExamen = res;
        console.log(this.alumnosExamen);
        if(!$('#alumnosExamenModal').is(':visible') && this.modalTitle3=="getAlumnosExamen"){
          $("#alumnosExamenModal").modal("show");
        };
      },
      err => console.error(err)
    )
  }

  getAlumnosNotExamen() {
    this.alumnosNotExamen = [];
    this.servicioExamen.getAlumnosNotExamen(this.examenSeleccionado.id).subscribe(
      res => {
        this.alumnosNotExamen = res;
        console.log(this.alumnosNotExamen);
        if(!$('#agregarAlumnosExamenModal').is(':visible') && this.modalTitle3=="agregarAlumno"){
          $("#agregarAlumnosExamenModal").modal("show");
        };
      },
      err => console.error(err)
    )
  }

  agregarAlumnoExamen(idExamen: number, idAlumno: number){
    this.servicioExamen.addAlumno(idExamen,idAlumno).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El alumno ha sido agregado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAlumnosNotExamen();
      },
      err => console.error(err)
    )
  }

  showPDF(pdf_base64: string){
    window.open(pdf_base64, "_blank");
  }

  convertFileSolicitud(event: any){
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
        form.controls['solicitud'].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function (error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0],this.examenForm);
  }

  // Consultar lista de alumnos
  openModalAlumnosExamen(examen: Examen){
    this.examenSeleccionado=examen;
    this.modalTitle3="getAlumnosExamen";
    this.modalTitle=examen.nombre;
    this.getAlumnosExamen();
  }

  // Eliminar una alumno
  eliminarAlumnoExamen(idExamen: number,idAlumno: number){
    Swal.fire({
      title: 'Quitar Alumno!',
      text: 'Estás seguro que deseas quitar a la alumno?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioExamen.eliminarAlumnoExamen(idExamen,idAlumno).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'Se ha quitado el alumno del examen',
              'success'
            )
           this.getAlumnosExamen();
          },
          err => console.error(err)
        )
      }
    });
  }

  cerrarModal(){
    this.submitted=false;
  }

  // Crear una examen
  onSubmit(){
    this.submitted = true;

    if(this.examenForm.invalid){
      console.log('Formulario inválido');
      return;
    }
    let examen = fromFormValue(this.examenForm.value);
    if(this.modalTitle2 == "Registrar"){
      this.servicioExamen.createExamen(examen).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El examen a sido guardado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          $("#examenModal").modal("hide");
          this.getExamenes();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.examenForm.value);
      let examen = fromFormValue(this.examenForm.value);
      this.servicioExamen.updateExamen(examen).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El examen ha sido actualizada',
            showConfirmButton: false,
            timer: 1500
          })
          $("#examenModal").modal("hide");
          this.getExamenes();
          this.submitted = false;
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

  deleteExamen(id:number){
    Swal.fire({
      title: 'Eliminar Examen!',
      text: 'Estás seguro que deseas eliminar el examen?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioExamen.deleteExamen(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'El Examen ha sido eliminado',
              'success'
            )
            this.getExamenes();
          },
          err => console.error(err)
        )
      }
    });
  }

  updateExamen(examen: Examen){
    this.submitted = true;
    this.examenForm.setValue(toRawFormValue(examen));
    this.modalTitle2 = "Actualizar";
    $("#examenModal").modal("show");
  }

  get f() { return this.examenForm.controls;}
  
  openModalAlumno(){
    this.examenForm.reset();
    this.modalTitle2 = "Registrar";
    $("#examenModal").modal("show");
  }

}
