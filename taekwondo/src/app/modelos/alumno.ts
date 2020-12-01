export class Alumno{
    id: number;
    nombre: string;
    apellidos: string;
    fecha_nacimiento: Date;
    fotografia: string;
    actividad_marcial: string;
    grado_actividad_marcial: string;
    seguro_medico: string;
    certificado_medico: string;
    carta_responsiva: string;

    constructor(id: number, nombre: string, apellidos: string, fecha_nacimiento, fotografia: string, actividad_marcial: string, grado_actividad_marcial: string, seguro_medico: string, certificado_medico: string, carta_responsiva: string){
        this.id = id;
        this.nombre = nombre; 
        this.apellidos=apellidos;
        this.fecha_nacimiento=fecha_nacimiento;
        this.fotografia=fotografia;
        this.actividad_marcial=actividad_marcial;
        this.grado_actividad_marcial=grado_actividad_marcial;
        this.seguro_medico=seguro_medico;
        this.certificado_medico=certificado_medico;
        this.carta_responsiva=carta_responsiva;
    }
}
