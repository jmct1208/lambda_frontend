import { Component, OnInit } from '@angular/core';
import { Evento } from '../../modelos/evento';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EventoService } from '../../servicios/evento.service';
import { Alumno} from '../../modelos/alumno';
import { TipoEvento} from '../../modelos/tipoEvento'
import Swal from 'sweetalert2';
import { TipoEventoService } from 'src/app/servicios/tipo-evento.service';

declare var $: any;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  alumnosEvento: Alumno[] | any;
  eventos: Evento[] | any;
  alumnosNotEvento: Alumno[] | any;
  tiposEvento: TipoEvento[] | any;
  tipoEvento: TipoEvento | any;
  eventoSeleccionado: Evento | any;
  tipoEventoSelec!: number;
  eventoForm!: FormGroup;
  submitted = false;
  modalTitle!: String;
  modalTitle2!:string;
  modalTitle3!:string;
  tipoEventoNombre!: String;
  tipoEventoDescripcion!: String;
  constructor(private servicioEvento: EventoService, private formBuilder: FormBuilder, private tipoEventoService: TipoEventoService) { }

  ngOnInit(): void {
    this.eventoForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      fechaf: ['', Validators.required],
      costo: ['', Validators.required],
      enlace: ['', Validators.required]

    });
    this.getEventos();
    this.getTiposEvento();
  }

  getTiposEvento() {
    this.tiposEvento = [];
    this.tipoEventoService.getTiposEvento().subscribe(
      res => {
        this.tiposEvento = res;
        console.log(this.tiposEvento);
      },
      err => console.error(err)
    )
  }
  
  getEventos(){
    this.eventos = [];
    this.servicioEvento.getEventos().subscribe(
      res => {
        this.eventos = res;
        console.log(this.eventos);
      },
      err => console.error(err)
    )
  }

  getAlumnosNotExamen(){
    this.alumnosNotEvento = [];
    this.servicioEvento.getAlumnosNotEvento(this.eventoSeleccionado.id).subscribe(
      res => {
        this.alumnosNotEvento = res;
        console.log(this.alumnosNotEvento)
        if(!$('#agregarAlumnosModal').is(':visible') && this.modalTitle3=="agregarAlumno"){
          $("#agregarAlumnosModal").modal("show");
        };
      },
      err => console.error(err)
    )
  }

  getTipoEvento(id: number){
    this.servicioEvento.getTipoEvento(id).subscribe(
      res => {
        this.tipoEvento=res;
        console.log(this.tipoEvento);
        $("#verTipoEvento").modal("show");
      },
      err => console.error(err)
    )
  }
  
  openModalAgregarAlumno(evento: Evento){
        this.eventoSeleccionado=evento;
        this.modalTitle3="agregarAlumno";
        this.getAlumnosNotExamen();
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

  agregarAlumno(idEvento: number,idAlumno: number){
    this.servicioEvento.addAlumno(idEvento,idAlumno).subscribe(
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

  getAlumnos(){
    this.alumnosEvento = [];
    this.servicioEvento.getAlumnosEvento(this.eventoSeleccionado.id).subscribe(
      res => {
        this.alumnosEvento = res;
        console.log(this.alumnosEvento)
        if(!$('#alumnosModal').is(':visible') && this.modalTitle3=="getAlumnosEvento"){
          $("#alumnosModal").modal("show");
        };
      },
      err => console.error(err)
    )
  }

  // Consultar lista de alumnos
  openModalAlumnos(evento: Evento){
    this.eventoSeleccionado=evento;
    this.modalTitle3="getAlumnosEvento";
    this.modalTitle=evento.nombre;
    this.getAlumnos();
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
           this.getAlumnos();
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
    if(this.eventoSeleccionado == null) {
      console.log('Falta el tipo de evento');
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
          this.getEventos();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.eventoForm.value);
      this.servicioEvento.updateEvento(this.eventoForm.value, this.tipoEventoSelec).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El evento ha sido actualizada',
            showConfirmButton: false,
            timer: 1500
          })
          $("#eventoModal").modal("hide");
          this.getEventos();
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
            this.getEventos();
          },
          err => console.error(err)
        )
      }
    });
  }

  updateEvento(evento: Evento){
    this.submitted = true;
    this.eventoForm.setValue(evento);
    /*
    this.eventoForm.controls['id'].setValue(evento.id);
    this.eventoForm.controls['nombre'].setValue(evento.nombre);
    this.eventoForm.controls['descripcion'].setValue(evento.descripcion);
    this.eventoForm.controls['fecha'].setValue(evento.fecha);
    this.eventoForm.controls['fechaf'].setValue(evento.fechaf);
    this.eventoForm.controls['costo'].setValue(evento.costo);
    */
    this.modalTitle2 = "Actualizar";
    $("#eventoModal").modal("show");

    
  }

  get f() { return this.eventoForm.controls;}
  
  openModalEvento(){
    this.eventoForm.reset();
    this.modalTitle2 = "Registrar";
    $("#eventoModal").modal("show");
  }
}
