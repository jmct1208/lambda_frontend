import { Component, OnInit } from '@angular/core';
import { Evento} from '../../modelos/evento';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EventoService } from '../../servicios/evento.service';
import { Alumno} from '../../modelos/alumno';
import { ServicioAlumno } from '../../servicios/alumno.service';
import {TipoEvento} from '../../modelos/tipoEvento'

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  eventoAlumnos: Alumno[] | any;
  eventos: Evento[] | any;
  alumnos: Alumno[] | any;
  tiposEvento: TipoEvento[] | any;
  tipoEvento: TipoEvento | any;
  evento: Evento | any;
  tipoEventoSelec!: number;
  eventoForm!: FormGroup;
  submitted = false;
  modalTitle!: String;
  modalTitle2!:string;
  modalTitle3!:string;
  tipoEventoNombre!: String;
  tipoEventoDescripcion!: String;
  constructor(private servicioEvento: EventoService, private formBuilder: FormBuilder, private servicioAlumno: ServicioAlumno) { }

  ngOnInit(): void {
    this.eventoForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      fechaf: ['', Validators.required],
      costo: ['', Validators.required],

    });
    this.getEventoes();
    this.getTipoEventos();
  }
  
  getTipoEventos(){
    this.tiposEvento = [];
    this.servicioEvento.getTipoEventoes().subscribe(
      res => {
        this.tiposEvento = res;
        //console.log(this.alumnos)
      },
      err => console.error(err)
    )
    this.tiposEvento =[new TipoEvento(1,"Alicia","Tokin en el alicia"),new TipoEvento(2,"ConcursoKingBoxing","Combates cuerpo a cuerpo"),new TipoEvento(3,"ConcursoKarate","Combates cuerpo a cuerpo")]
  }

  getEventoes(){
    this.eventos = [];
    this.servicioEvento.getEventoes().subscribe(
      res => {
        this.eventos = res;
        //console.log(this.alumnos)
      },
      err => console.error(err)
    )
  }

  getAlumnos(){
    this.alumnos = [];
    this.servicioAlumno.getAlumnos().subscribe(
      res => {
        this.alumnos = res;
        console.log(this.alumnos)
        this.escogerAlumnos();
        if(!$('#agregarAlumnosEventoModal').is(':visible') && this.modalTitle3=="agregarAlumno"){
          $("#agregarAlumnosEventoModal").modal("show");
        };
      },
      err => console.error(err)
    )
  }

  getTipoEvento(id: number){
    //tipoevento ; TipoEvento
    this.servicioEvento.getTipoEvento(id).subscribe(
      res => {
        this.tipoEvento=res;
      },
      err => console.error(err)

    )
    $("#verTipoEvento").modal("show");
  }
  
  escogerAlumnos(){
    for(const j in this.alumnos){
      for(const i in this.eventoAlumnos){
        if (this.eventoAlumnos[i].id == this.alumnos[j].id) {
          this.alumnos.splice(j, 1);
        }
      }   
   }
  }

  agregarAlumno(evento: Evento){
        this.evento=evento;
        this.modalTitle3="agregarAlumno";
        this.getEventoAlumnos();
  }

  showPDF(pdf_base64: any){
    const linkSource = pdf_base64;
    const downloadLink = document.createElement("a");
    const fileName = "sample.pdf";

    downloadLink.href = linkSource;
   // downloadLink.download = fileName;
    downloadLink.click();

    return downloadLink;
  }

  agregarAlumnoEvento(idEvento: number,idAlumno: number){
    this.servicioEvento.addAlumno(idEvento,idAlumno).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El alumno ha sido agregado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEventoAlumnos();
      },
      err => console.error(err)
    )
  }

  getEventoAlumnos(){
    this.eventoAlumnos = [];
    this.servicioEvento.getAlumnosEventoes(this.evento.id).subscribe(
      res => {
        this.eventoAlumnos = res;
        console.log(this.alumnos)
        if(!$('#alumnosEventoModal').is(':visible') && this.modalTitle3=="getAlumnosEvento"){
          $("#alumnosEventoModal").modal("show");
        }else{
          this.getAlumnos();
        }
      },
      err => console.error(err)
    )
  }

  // Consultar lista de alumnos
  getAlumnosEvento(evento: Evento){
    this.evento=evento;
    this.modalTitle3="getAlumnosEvento";
    this.modalTitle=evento.nombre;
    this.getEventoAlumnos();
  }

  // Eliminar una alumno
  eliminarAlumnoEvento(idEvento: number,idAlumno: number){
    Swal.fire({
      title: 'Quitar Alumno!',
      text: 'Estás seguro que deseas quitar a la alumno?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioEvento.eliminarAlumnoEvento(idEvento,idAlumno).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'Se a quitado el alumno del evento',
              'success'
            )
           this.getEventoAlumnos();
          },
          err => console.error(err)
        )
      }
    });
  }

  cerrarModal(){
    this.submitted=false;
  }

  // Crear una evento
  onSubmit(){
    this.submitted = true;

    if(this.eventoForm.invalid){
      console.log('Formulario inválido');
      return;
    }
    if(this.modalTitle2 == "Registrar"){
      this.servicioEvento.createEvento(this.eventoForm.value,this.tipoEventoSelec).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El evento a sido guardado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          $("#eventoModal").modal("hide");
          this.getEventoes();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.eventoForm.value);
      this.servicioEvento.updateEvento(this.eventoForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El evento ha sido actualizada',
            showConfirmButton: false,
            timer: 1500
          })
          $("#eventoModal").modal("hide");
          this.getEventoes();
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

  deleteEvento(id:number){
    Swal.fire({
      title: 'Eliminar Evento!',
      text: 'Estás seguro que deseas eliminar el evento?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioEvento.deleteEvento(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'El Evento ha sido eliminado',
              'success'
            )
            this.getEventoes();
          },
          err => console.error(err)
        )
      }
    });
  }

  updateEvento(evento: Evento){
    this.submitted = true;

    this.eventoForm.controls['id'].setValue(evento.id);
    this.eventoForm.controls['nombre'].setValue(evento.nombre);
    this.eventoForm.controls['tipo'].setValue(evento.tipo);
    this.eventoForm.controls['descripcion'].setValue(evento.descripcion);
    this.eventoForm.controls['fecha'].setValue(evento.fecha);
    this.eventoForm.controls['fechaf'].setValue(evento.fechaf);
    this.eventoForm.controls['costo'].setValue(evento.costo);
    this.modalTitle2 = "Actualizar";
    $("#eventoModal").modal("show");

    
  }

  get f() { return this.eventoForm.controls;}
  
  openModalAlumno(){
    this.eventoForm.reset();
    this.modalTitle2 = "Registrar";
    $("#eventoModal").modal("show");
  }
}
