export class Examen{
    id: number;
    nombre: string;
    tipo: string;
    fecha_hora: string;
    costo: number;
    enlace: string;
    solicitud: string;

    constructor(id:number, nombre:string, tipo:string, fecha_hora:string, costo:number, enlace:string, solicitud:string){
        this.id=id;
        this.nombre=nombre; 
        this.tipo=tipo;
        this.fecha_hora=fecha_hora;
        this.costo=costo;
        this.enlace=enlace;
        this.solicitud=solicitud;
    }
}

export function fromFormValue(formValue: RawFormValue):Examen {
    let fecha_hora = formValue.fecha + 'T' + formValue.hora;
    return new Examen(formValue.id, formValue.nombre, formValue.tipo, fecha_hora, formValue.costo, formValue.enlace, formValue.solicitud);
}

export function toRawFormValue(examen: Examen): RawFormValue {
    let fecha = examen.fecha_hora.substring(0,10);
    let hora = examen.fecha_hora.substring(11,16);
    return new RawFormValue(examen.id, examen.nombre, examen.tipo, fecha, hora, examen.costo, examen.enlace, examen.solicitud);
}

export class RawFormValue {
    id: number;
    nombre: string;
    tipo: string;
    fecha: string;
    hora: string;
    costo: number;
    enlace: string;
    solicitud: string;

    constructor(id: number, nombre: string, tipo: string, fecha: string, hora: string, costo:number, enlace:string, solicitud: string) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.fecha = fecha;
        this.hora = hora;
        this.costo = costo;
        this.enlace = enlace;
        this.solicitud = solicitud;
    }
}
