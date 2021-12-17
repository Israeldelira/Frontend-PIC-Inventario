import { environment } from "src/environments/environment"

const base_url = environment.base_url
interface _bajasUser {
    _id: string,
    user: string,
    img: string
}
export interface CargarBajas{
    total:number;
    outputs:Bajas[];
}
export interface getBaja{
   
     bajas:Bajas[];
}
export interface allBajas{
   
    bajas:Bajas[];
}


export class Bajas {

    constructor(
        public _id: string,
        public article: string,
        public description: string,
        public project: string,
        public quantity:number,
        public status:boolean,
        public registerUser?: _bajasUser,
    ) { }
}
