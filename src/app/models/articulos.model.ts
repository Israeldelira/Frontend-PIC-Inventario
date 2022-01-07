import { environment } from "src/environments/environment"

const base_url = environment.base_url
interface _articuloUser{
    _id:string,
    user:string,
    img:string,
}
interface _provedorUser{
    _id:string,
    name:string,
}
interface _categoriaUser{
    _id:string,
    name:string,
}
export interface getArticulo{
   
    article:Articulo[];
}

export interface DashboardStock{
   
    lowStock:Articulo[];
    highStock:Articulo[];
    totalLow:number;
    totalHigh:number;
}
export interface CargarArticulos{
    total:number;
    allArticles:Articulo[];
}
export interface CargarTodosArticulos{
    
    articles:Articulo[];
}
export class Articulo {

    constructor(
        public _id: string,
        public name: string,
        public model: string,
        public trademark: string,
        public category: _categoriaUser,
        public providerId: _provedorUser,
        public registerUser: _articuloUser,
        public levelStock: string,
        public date: string,
        public codeQR: string,
        public quantity: number,
        public img?: string|any,



    ){}
    get imgUrl(){
        if(!this.img){
            console.log("ni entra la funcion")
            return`${base_url}/upload/articles/no-image` 
        }
        //base_url/usuario/no-image
        if(this.img){
            console.log("ni entra la funcionx2")
            return`${base_url}/upload/articles/${this.img}`
        }
            else{
                return`${base_url}/upload/articles/no-image.png`
            }
    }
}
