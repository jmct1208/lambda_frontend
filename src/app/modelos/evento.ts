export class Evento{
    id: number;
    nombre: string;
    tipo: string;
    descripcion: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    costo: string;
    enlace_facebook: string;

    constructor(id, nombre, descripcion, fecha_incio, fecha_fin, costo, enlace_facebook){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion 
        this.fecha_inicio=fecha_incio;
        this.fecha_fin=fecha_fin;
        this.costo=costo;
        this.enlace_facebook=enlace_facebook;
    }
}