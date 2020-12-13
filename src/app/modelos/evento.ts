import { TipoEvento } from './tipoEvento';

export class Evento{
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    fechaf: string;
    tipoEvento: TipoEvento;
    costo: number;
    enlace: string;


    constructor(id:number, nombre:string, descripcion:string, fecha_incio:string, fechaf:string, tipoEvento: TipoEvento, costo:number, enlace:string){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion 
        this.fecha=fecha_incio;
        this.fechaf=fechaf;
        this.costo=costo;
        this.tipoEvento = tipoEvento;
        this.enlace=enlace;
    }
}