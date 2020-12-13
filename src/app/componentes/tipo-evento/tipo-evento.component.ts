import { Component, OnInit } from '@angular/core';
import { TipoEvento } from '../../modelos/tipoEvento';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { TipoEventoService } from '../../servicios/tipo-evento.service';
import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.css']
})
export class TipoEventoComponent implements OnInit {
  tiposEvento: TipoEvento[] | any;
  tipoEventoSeleccionado: TipoEvento | any;
  tipoEventoForm!: FormGroup;
  submitted = false;
  modalTipoEventoTitle!: string;

  constructor(private servicioTipoEvento: TipoEventoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.tipoEventoForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.getTiposEvento()
  }

  getTiposEvento() {
    this.tiposEvento = [];
    this.servicioTipoEvento.getTiposEvento().subscribe(
      res => {
        this.tiposEvento = res;
      },
      err => console.error(err)
    )
  }

  openModalRegistrar() {
    this.tipoEventoForm.reset();
    this.modalTipoEventoTitle = "Registrar"
    $("#tipoEventoModal").modal("show");
  }

  openModalActualizar(tipoEvento: TipoEvento) {
    this.submitted = true;
    this.tipoEventoForm.setValue(tipoEvento);
    this.modalTipoEventoTitle = "Actualizar";
    $("#tipoEventoModal").modal("show");
  }

  get f() { return this.tipoEventoForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if(this.tipoEventoForm.invalid) {
      console.log("Formulario inválido.");
      return;
    }
    if(this.modalTipoEventoTitle == "Registrar") {
      this.servicioTipoEvento.createTipoEvento(this.tipoEventoForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El tipo de evento ha sido guardado exitosamente.',
            showConfirmButton: false,
            timer: 1500
          }) 
          $("tipoEventoModal").modal("hide");
          this.getTiposEvento();
          this.submitted = false;
        },
        err => console.error(err)
      )
    } else {
      console.log(this.tipoEventoForm.value);
      this.servicioTipoEvento.updateTipoEvento(this.tipoEventoForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El tipo de evento ha sido actualizado.',
            showConfirmButton: false,
            timer: 1500
          })
          $("tipoEventoModal").modal("hide");
          this.getTiposEvento();
          this.submitted = false;
        },
        err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops..., I did it again!',
            text: "Error al conectar con el servidor"
          })
        }
      )
    }
  }

  deleteTipoEvento(id: number) {
    Swal.fire({
      title: "Eliminar tipo de evento",
      text: '¿Estás seguro de que deseas eliminar el tipo de evento?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`
    }).then((result)=> {
      if (result.isConfirmed) {
        this.servicioTipoEvento.deleteTipoEvento(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado',
              'El tipo de evento ha sido eliminado',
              'success'
            )
            this.getTiposEvento();
          },
          err => console.error(err)
        )
      }
    });
  }
}
