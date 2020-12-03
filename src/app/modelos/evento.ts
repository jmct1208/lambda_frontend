export class Evento{
    id: number;
    nombre: string;
    tipo: number;
    descripcion: string;
    fecha: Date;
    fechaf: Date;
    costo: number;
    enlace: string;


    constructor(id:number, nombre:string, tipo:number, descripcion:string, fecha_incio:Date, fechaf:Date, costo:number, enlace:string){
        this.id=id;
        this.nombre=nombre;
        this.tipo=tipo;
        this.descripcion=descripcion 
        this.fecha=fecha_incio;
        this.fechaf=fechaf;
        this.costo=costo;
        this.enlace=enlace;
    }
}