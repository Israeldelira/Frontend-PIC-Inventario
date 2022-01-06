import { environment } from "src/environments/environment"

const base_url = environment.base_url


export interface allUsuarios{
   
    users:Usuario[];
}
export class Usuario{
   
    constructor(
        public _id:string,
      public  nombre:string,
       public user:string,
       public password:string,
       public role?:'ADMIN' | 'USER',
       public img?:string | any,
       public status?:Boolean,
       public activate?:Boolean,
    
    ){}
    get imgUrl(){
        if(!this.img){
            return`${base_url}/upload/users/no-image` 
        }
        //base_url/usuario/no-image
        if(this.img){
            return`${base_url}/upload/users/${this.img}`
        }
            else{
                return`${base_url}/upload/users/no-image`
            }
    }
}
