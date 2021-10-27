import { environment } from "src/environments/environment"

const base_url = environment.base_url
export class Usuario{
    constructor(
        public _id:string,
       public role:string,
      public  nombre:string,
       public user:String,
       public password:String,
       public img?:string | any
    
    ){}
    get imgUrl(){
        //base_url/usuario/no-image
        if(this.img){
            return`${base_url}/upload/users/${this.img}`
        }
            else{
                return`${base_url}/upload/users/no-image`
            }
    }
}
