import { environment } from "src/environments/environment"

const base_url = environment.base_url
interface _provedorUser {
    _id: string,
    user: string,
    img: string
}
export interface CargarProvedor{
    total:number;
    allProviders:Provedor[];
}
export interface getProvedor{
   
     provider:Provedor[];
}
export interface allProvedor{
   
    providers:Provedor[];
}


export class Provedor {

    constructor(
        public _id: string,
        public name: string,
        public phone:number,
        public address:string,
  
        public status:boolean,
        public registerUser?: _provedorUser,
    ) { }
}
