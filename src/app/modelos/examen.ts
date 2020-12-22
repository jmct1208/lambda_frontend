export class Examen{
    id: number;
    nombre: string;
    tipo: string;
    fecha: Date;
    costo: string;
    horario: string;
    enlace_facebook: string;
    solicitud_examen: string;

    constructor(id, nombre, tipo, fecha, costo, horario, enlace_facebook, solicitud_examen){
        this.id=id;
        this.nombre=nombre; 
        this.tipo=tipo;
        this.fecha=fecha;
        this.costo=costo;
        this.horario=horario;
        this.enlace_facebook=enlace_facebook;
        this.solicitud_examen=solicitud_examen;
    }
}