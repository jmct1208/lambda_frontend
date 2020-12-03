export class TipoEvento{
    id: number;
    nombre: String;
    descripcion: String;

    constructor(id: number,nombre: String,descripcion:String){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
    }
}