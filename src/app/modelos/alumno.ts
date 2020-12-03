export class Alumno{
    id: number;
    nombre: string;
    apellidos: string;
    fecha: Date;
    fotografia: string;
    actividad: string;
    grado: string;
    seguro: string;
    certificado: string;
    carta: string;

    constructor(id: number, nombre: string, apellidos: string, fecha:Date, fotografia: string, actividad: string, grado: string, seguro: string, certificado: string, carta: string){
        this.id = id;
        this.nombre = nombre; 
        this.apellidos=apellidos;
        this.fecha=fecha;
        this.fotografia=fotografia;
        this.actividad=actividad;
        this.grado=grado;
        this.seguro=seguro;
        this.certificado=certificado;
        this.carta=carta;
    }
}