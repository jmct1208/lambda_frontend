import { Component, OnInit } from '@angular/core';
import { Examen} from '../../modelos/examen';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ExamenService } from '../../servicios/examen.service';
import { Alumno} from '../../modelos/alumno';
import { ServicioAlumno } from '../../servicios/alumno.service';

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  examenAlumnos: Alumno[] | any;
  examenes: Examen[] | any;
  alumnos: Alumno[] | any;
  examen: Examen | any;
  examenForm: FormGroup;
  submitted = false;
  modalTitle: String;
  modalTitle2:string;
  constructor(private servicioExamen: ExamenService, private formBuilder: FormBuilder, private servicioAlumno: ServicioAlumno) { }

  ngOnInit(): void {
    this.examenForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      costo: ['', Validators.required],
      horario: ['', Validators.required],
    });
    this.getExamenes();
 }
  
  getExamenes(){
    this.examenes = [];
    this.servicioExamen.getExamenes().subscribe(
      res => {
        this.examenes = res;
        //console.log(this.alumnos)
      },
      err => console.error(err)
    )
    this.examenes =[new Examen(1,"Algebra","Matematicas","1992-01-01T00:00:00.000+00:00","$30","13:00","","")]
  }

  getAlumnos(){
    this.alumnos = [];
    this.servicioAlumno.getAlumnos().subscribe(
      res => {
        this.alumnos = res;
        console.log(this.alumnos)
      },
      err => console.error(err)
    )
   this.alumnos=[new Alumno(11,"Ivan","Saavedra","1992-01-01T00:00:00.000+00:00","https://www.eluniversal.com.mx/sites/default/files/2020/09/24/los-mejores-memes-de-chuck-norris.jpg","Karate","","Av. Universidad S/N, Coyoacán","SAIV920101",""),new Alumno(11,"Chuck","Norris","1992-01-01T00:00:00.000+00:00","https://www.eluniversal.com.mx/sites/default/files/2020/09/24/los-mejores-memes-de-chuck-norris.jpg","King Boxing","","Av. Universidad S/N, Coyoacán","CHNR841401","")]

  }
  
  escogerAlumnos(){
    for(const j in this.alumnos){
      for(const i in this.examenAlumnos){
        if (this.examenAlumnos[i].id == this.alumnos[j].id) {
          this.alumnos.splice(j, 1);
        }
      }   
   }
  }

  agregarAlumno(examen: Examen){
       this.examen=examen;
       this.getExamenAlumnos();
       this.getAlumnos();
       this.escogerAlumnos();
       $("#agregarAlumnosExamenModal").modal("show");
  }

  agregarAlumnoExamen(idExamen: number,idAlumno: number){
    this.servicioExamen.addAlumno(idExamen,idAlumno).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El alumno ha sido agregado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.escogerAlumnos();
        this.getExamenAlumnos();
      },
      err => console.error(err)
    )
  }

  getExamenAlumnos(){
    this.examenAlumnos = [];
    this.servicioExamen.getAlumnosExamenes(this.examen.id).subscribe(
      res => {
        this.examenAlumnos = res;
        //console.log(this.alumnos)
      },
      err => console.error(err)
    )
    this.examenAlumnos=[new Alumno(11,"Ivan","Saavedra","1992-01-01T00:00:00.000+00:00","https://www.eluniversal.com.mx/sites/default/files/2020/09/24/los-mejores-memes-de-chuck-norris.jpg","Karate","","Av. Universidad S/N, Coyoacán","SAIV920101",""),new Alumno(11,"Chuck","Norris","1992-01-01T00:00:00.000+00:00","https://www.eluniversal.com.mx/sites/default/files/2020/09/24/los-mejores-memes-de-chuck-norris.jpg","King Boxing","","Av. Universidad S/N, Coyoacán","CHNR841401","")]
  }

  // Consultar lista de alumnos
  getAlumnosExamen(examen: Examen){
    this.examen=examen;
    this.getExamenAlumnos();
    this.modalTitle=examen.nombre;
    $("#alumnosExamenModal").modal("show");
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
              'Se a quitado el alumno del examen',
              'success'
            )
           this.getExamenAlumnos();
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
    if(this.modalTitle2 == "Registrar"){
      this.servicioExamen.createExamen(this.examenForm.value).subscribe(
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
      this.servicioExamen.updateExamen(this.examenForm.value).subscribe(
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

    this.examenForm.controls['id'].setValue(examen.id);
    this.examenForm.controls['nombre'].setValue(examen.nombre);
    this.examenForm.controls['tipo'].setValue(examen.tipo);
    this.examenForm.controls['fecha'].setValue(examen.fecha);
    this.examenForm.controls['costo'].setValue(examen.costo);
    this.examenForm.controls['horario'].setValue(examen.horario);

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
