import { TipoEvento } from "./tipoEvento";

export interface Usuario{
  id: number;
  nombre: String;
  password: String;
  tipo: TipoEvento;

}
