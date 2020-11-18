import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoEvento} from '../_models/tipoEvento';

@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {

  API_URI = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getTipoEventos(){
    return this.http.get(this.API_URI+'/tipoEvento');
  }

  getTipoEvento(id: number){
    return this.http.get(this.API_URI+'/tipoEvento/'+id);
  }

  createTipoEvento(tipoEvento: TipoEvento){
    return this.http.post(this.API_URI+'/tipoEvento',tipoEvento);
  }

  updateTipoEvento(tipoEvento: TipoEvento){
    return this.http.put(this.API_URI+'/tipoEvento/'+tipoEvento.id,tipoEvento);
  }

  deleteTipoEvento(id: number){
    return this.http.delete(this.API_URI+'/tipoEvento/'+id);
  }
}
