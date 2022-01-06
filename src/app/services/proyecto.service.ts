import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { allProyecto, CargarProyecto, DashboardProyecto, getProyecto, Proyecto } from '../models/proyecto.models';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(
    private http:HttpClient,
  )
   { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  cargarProyecto(pagination:number=0){
    const url = `${base_url}/project/get-projects?pagination=${pagination}`;
    return this.http.get<CargarProyecto>(url, this.headers)
  .pipe(
    map(resp=>{
      const proyectos=resp.allProjects
        console.log(proyectos)
        return{
          total:resp.total,
          proyectos
        }
      
    })
  );
}
dashboardProyecto(){
  const url = `${base_url}/project/projectsDashboard`;
  return this.http.get<DashboardProyecto>(url, this.headers)
.pipe(
  map(resp=>{
    const proyectosCompletos=resp.projectsComplete
    const proyectosIncompletos=resp.projectsIncomplete
    const totalCompletos=resp.totalComplete
    const totalIncompletos=resp.totalIncomplete
      return{
        totalIncompletos:totalIncompletos,
        totalCompletos:totalCompletos,
        proyectosIncompletos:proyectosIncompletos,
        proyectosCompletos:proyectosCompletos
      }
    
  })
);
}
obtenerProyectoss() {
  return this.http.get<allProyecto>(`${ base_url }/project/get-projectsAll`,this.headers)
  .pipe(
    map(resp=>{
      const proyectos=resp.projects
      return proyectos
    })
  );
}

crearProyecto(proyecto: { name: string, client: string,manager: string }){
  const url = `${base_url}/project/create-project`;
  return this.http.post(url,proyecto,this.headers)
}

actualizarProyecto(proyecto:Proyecto){
  const url = `${base_url}/project/edit-project/${proyecto._id}`;
  return this.http.put(url,proyecto,this.headers)
}
completarProyecto(proyecto:Proyecto){
  const url = `${base_url}/project/completeProject/${proyecto._id}`;
  return this.http.put(url,proyecto,this.headers)
}
eliminarProyecto(_id:string){
  const url = `${base_url}/project/delete-project/${_id}`;
  return this.http.delete(url,this.headers)
}

obtenerProyecto(_id:string){
  const url = `${base_url}/project/get-project/${_id}`;
  return this.http.get<getProyecto>(url,this.headers)
  .pipe(
    map(project=>{
      const proyecto=project
        console.log(proyecto)
        return{
          proyecto
        }
    })
  );
}
}

