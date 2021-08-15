import { Usuario } from "./usuario";

export class Arbol{
    id!: number;
    username!: string;
    posicion!: string;
    patrocinados!:Array<Arbol>;
    p1!: number;
    p2!: number;
    p3!: number;
    p4!: number;
    fecha_p1!: Date;
    fecha_p2!: Date;
    fecha_p3!: Date;
    fecha_p4!: Date;
    s1!: number;
    s2!: number;
    s3!: number;
    s4!: number;
    precio_p1!: number;
    precio_p2!: number;
    precio_p3!: number;
    precio_p4!: number;
    porcentaje_p1!: number;
    porcentaje_p2!: number;    
    porcentaje_p3!: number;
    porcentaje_p4!: number;
    puntos_p1!: number;
    puntos_p2!: number;    
    puntos_p3!: number;
    puntos_p4!: number;

    constructor(
        
    ){}
}