import { environment } from "src/environments/environment"

const base_url = environment.base_url
interface _proyectoUser {
    _id: string,
    user: string,
    img: string
}
export interface CargarProyecto{
    total:number;
    allProjects:Proyecto[];
}
export interface getProyecto{
   
     project:Proyecto[];
}
export interface DashboardProyecto{
   
    projectsComplete:Proyecto[];
    projectsIncomplete:Proyecto[];
    totalComplete:number;
    totalIncomplete:number;
}
export interface allProyecto{
   
    projects:Proyecto[];
}


export class Proyecto {

    constructor(
        public _id: string,
        public name: string,
        public client:string,
        public manager:string,
        public complete:boolean,
        public status:boolean,
        public outputs:any,
        public registerUser?: _proyectoUser,
    ) { }
}
