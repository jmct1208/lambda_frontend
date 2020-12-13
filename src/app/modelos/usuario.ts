export class Usuario {
    id: number;
    password: string;
    tipo: boolean;

    constructor(id:number, password:string, tipo:boolean) {
        this.id = id;
        this.password = password;
        this.tipo = tipo;
    }
}