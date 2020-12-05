export class Examen{
    id: number;
    nombre: string;
    tipo: string;
    fecha: Date;
    costo: number;
    horario: Date;
    enlace: string;
    solicitud: string;

    constructor(id:number, nombre:string, tipo:string, fecha:Date, costo:number, horario:Date, enlace:string, solicitud:string){
        this.id=id;
        this.nombre=nombre; 
        this.tipo=tipo;
        this.fecha=fecha;
        this.costo=costo;
        this.horario=horario;
        this.enlace=enlace;
        this.solicitud=solicitud;
    }
}
