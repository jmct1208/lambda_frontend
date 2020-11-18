import { Component, OnInit } from '@angular/core';

import { TipoEvento } from '../../_models/tipoEvento';
import { TipoEventoService } from '../../_services/tipo-evento.service';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

//import { AnyNaptrRecord } from 'dns';

declare var $: any;

@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.css']
})
export class TipoEventoComponent implements OnInit {

  tipoEventos: TipoEvento[] | any;
  tipoEvento: TipoEvento | any;
  tipoEventoForm: FormGroup;
  submitted = false;
  
  constructor(private tipoEventoService: TipoEventoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Inicie el formulario vacio
    this.tipoEventoForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    
    // Consulte lista de los tipos de eventos
    this.getTipoEventos();
  }

  // Consultar lista de los tipos de eventos
  getTipoEventos(){
    this.tipoEventos = [];
    this.tipoEventoService.getTipoEventos().subscribe(
      res => {
        this.tipoEventos = res;
        console.log(this.tipoEventos)
      },
      err => console.error(err)
    )
    this.tipoEventos = [new TipoEvento(11,"Evento1","Este es un evento 1"), 
    new TipoEvento(12,"Evento2","Aqui va el evento 2"), 
    new TipoEvento(13,"Evento3","Último evento de prueba")];
  }

  // Consultar un tipos de evento
  getTipoEvento(id){
    this.tipoEvento = null;
    this.tipoEventoService.getTipoEvento(id).subscribe(
      res => {
        this.tipoEvento = res;
      },
      err => console.error(err)
    )
  }

  // Eliminar un tipos de evento
  deleteTipoEvento(id){
    this.tipoEventoService.deleteTipoEvento(id).subscribe(
      res => {
        this.getTipoEventos();
      },
      err => console.error(err)
    )
  }

  // Crear un tipos de evento
  createTipoEvento(){
    this.submitted = true;

    if(this.tipoEventoForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    this.tipoEventoService.createTipoEvento(this.tipoEventoForm.value).subscribe(
      res => {
        this.getTipoEventos();
      },
      err => console.error(err)
    )
  }

  // Actualizar un tipo de evento
  updateTipoEvento(){
    this.submitted = true;

    if(this.tipoEventoForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    this.tipoEventoService.updateTipoEvento(this.tipoEventoForm.value).subscribe(
      res => {
        this.getTipoEventos();
      },
      err => console.error(err)
    )
  }

  get f() { return this.tipoEventoForm.controls;}
  
  openModalTipoEvento(){    
    this.tipoEventoForm.reset();    
    $("tipoEventoModal").modal("show");  
  }

}
