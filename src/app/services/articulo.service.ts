import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Articulo, CargarArticulos, CargarTodosArticulos, DashboardStock, getArticulo } from '../models/articulos.model';
import { allProyecto } from '../models/proyecto.models';

const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http: HttpClient) { }

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
  cargarArticulos(pagination:number=0){
    const url = `${base_url}/articulos/get-articles?pagination=${pagination}`;
    return this.http.get<CargarArticulos>(url, this.headers)
  .pipe(
    map(resp=>{
      const articulos=resp.allArticles
      console.log(resp)
        console.log(articulos)
        return{
          total:resp.total,
          articulos
        }
      
    })
  );
}
cargarTodosArticulos(){
  const url = `${base_url}/articulos/get-articlesAll`;
  return this.http.get<CargarTodosArticulos>(url, this.headers)
.pipe(
  map(resp=>{
    const articulos=resp.articles
      return articulos
  })
);
}

cargarDashboardStock(pagination:number=0){
  const url = `${base_url}/articulos/dashboardStock?pagination=${pagination}`;
  return this.http.get<DashboardStock>(url, this.headers)
.pipe(
  map(resp=>{
    const articulosLow=resp.lowStock
    const articulosHigh=resp.highStock
    const totalLow=resp.totalLow
    const totalHigh=resp.totalHigh


      return{
        articulosLow,
        articulosHigh,
        totalLow,
        totalHigh
      }
  })
);
}

obtenerArticulo(_id:string){
  const url = `${base_url}/articulos/get-article/${_id}`;
  return this.http.get<getArticulo>(url,this.headers)
  .pipe(
    map(article=>{
      const articulo=article
        console.log(articulo)
        return{
          articulo
        }
    }),
    catchError(err=>{
      console.log('sucedio un error')
      console.log(err)
      return throwError('El id no existe')
    })
  );
}
// actualizarArticulo(articulo:FormData): Observable<any>{
//   console.log("esto trae el form data"+articulo)
//   const url = `${base_url}/provider/edit-provider/${articulo}`;
//   return this.http.put(url,articulo,this.headers)
// }
actualizarArticulo(articulo:Articulo){
  const url = `${base_url}/articulos/edit-article/${articulo._id}`;
  return this.http.put(url,articulo,this.headers)
}

agregarArticulo( articulo: FormData): Observable<any> {
  return this.http.post<Articulo>(`${base_url }/articulos/create-article`, articulo,this.headers);
}

// actualizarProvedor(provedor:Provedor){
//   const url = `${base_url}/provider/edit-provider/${provedor._id}`;
//   return this.http.put(url,provedor,this.headers)
// }
eliminarArticulo(articulo:Articulo){
  const url = `${base_url}/articulos/delete-article/${articulo._id}`;
  return this.http.delete(url,this.headers)
}

}
