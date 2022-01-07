import { environment } from "src/environments/environment"

const base_url = environment.base_url
interface _entradasUser {
    _id: string,
    user: string,
    img: string
}
export interface CargarEntradas{
    total:number;
    inputs:Entradas[];
}
export interface getEntrada{
   
     entrada:Entradas[];
}
export interface allEntradas{
   
    entradas:Entradas[];
}


export class Entradas {

    constructor(
        public _id: string,
        public article: string,
        public quantity:number,
        public status:boolean,
        public registerUser?: _entradasUser,
    ) { }
}
