import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoEvento } from '../modelos/tipoEvento';

@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {
  API_URI = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getTiposEvento() {
    return this.http.get(this.API_URI+'/tipos_evento/');
  }

  getTipoEvento(id: number) {
    return this.http.get(this.API_URI+'/tipos_evento/'+id);
  }

  createTipoEvento(tipoEvento: TipoEvento) {
    return this.http.post(this.API_URI+'/tipos_evento', tipoEvento);
  }

  updateTipoEvento(tipoEvento: TipoEvento) {
    return this.http.put(this.API_URI+'/tipos_evento/'+tipoEvento.id, tipoEvento);
  }

  deleteTipoEvento(id: number) {
    return this.http.delete(this.API_URI+'/tipos_evento/'+id);
  }
}
