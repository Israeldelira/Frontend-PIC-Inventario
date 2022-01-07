import { environment } from "src/environments/environment"

const base_url = environment.base_url
interface _categoriaUser {
    _id: string,
    user: string,
    img: string
}
export interface CargarCategoria{
    total:number;
    allCategorys:Categoria[];
}
export interface allCategorys{
 
    categorys:Categoria[];
}
export class Categoria {

    constructor(
        public _id: string,
        public name: string,
        public total:number,
        public registerUser?: _categoriaUser,
        

    ) { }
}
