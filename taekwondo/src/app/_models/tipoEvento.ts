export class TipoEvento{
    id: number;
    nombre: string;
    descripcion: string;

    constructor(id, nombre, descripcion){
        this.id = id;
        this.nombre = nombre; 
        this.descripcion = descripcion;
    }
}