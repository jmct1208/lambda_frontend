import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoEvento } from '../modelos/tipoEvento';
import { Evento } from '../modelos/evento';

@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {
  API_URI = 'http://localhost:8080/tipos_evento';
  constructor(private http: HttpClient) { }

  getTiposEvento() {
    return this.http.get(this.API_URI);
  }

  getTipoEvento(id: number) {
    return this.http.get(this.API_URI+ '/' +id);
  }

  createTipoEvento(tipoEvento: TipoEvento) {
    return this.http.post(this.API_URI, tipoEvento);
  }

  createEvento(evento: Evento, idTipoEvento: number){
    console.log(evento);
    return this.http.post(this.API_URI + '/' + idTipoEvento + '/eventos', evento);
  }

  updateTipoEvento(tipoEvento: TipoEvento) {
    return this.http.put(this.API_URI + '/' + tipoEvento.id, tipoEvento);
  }

  deleteTipoEvento(id: number) {
    return this.http.delete(this.API_URI  + '/' + id);
  }
}
