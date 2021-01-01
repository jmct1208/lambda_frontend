export class TipoEvento{
    id: number;
    nombre: string;
    descripcion: String;

    constructor(id: number, nombre: string, descripcion:string){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
    }
}