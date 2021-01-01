import { TipoEvento } from "./tipoEvento";

export class Usuario{
  id!: number;
  nombre: string;
  password: string;
  tipo!: TipoEvento;

  constructor(nombre:string, password: string) {
    this.nombre = nombre;
    this.password = password;
  }
}

