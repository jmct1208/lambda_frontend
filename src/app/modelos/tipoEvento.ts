export class TipoEvento{
    id: number;
    nombre: String;
    descripcion: String;

    constructor(id,nombre,descripcion){
        this.nombre=nombre;
        this.descripcion=descripcion;
    }
}