import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { allCategorys, CargarCategoria, Categoria } from '../models/categoria.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})

export class CategoriaService {


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
  cargarCategoria(pagination:number=0){
    const url = `${base_url}/category/get-categorys?pagination=${pagination}`;
    return this.http.get<CargarCategoria>(url, this.headers)
  .pipe(
    map(resp=>{
      const categorias=resp.allCategorys
        console.log(categorias)
        return{
          total:resp.total,
          categorias
        }
      
    })
  );
}
cargarAllCategorys(){
  const url = `${base_url}/category/get-categorysAll`;
  return this.http.get<allCategorys>(url, this.headers)
.pipe(
  map(resp=>{
    const categorias=resp.categorys
      console.log("estas son las"+categorias)
      return{
        categorias
      }
  })
);
}


//   cargarCategoria(pagination:number=0):Observable<Categoria[]>{
//     const url = `${base_url}/category/get-categorys?pagination=${pagination}`;
//     return this.http.get<{ok:boolean,allCategorys:Categoria[]}>(url, this.headers)
//   .pipe(
//     map((resp:{ok:boolean,allCategorys:Categoria[] }) =>resp.allCategorys)
//   );
// }
crearCategoria(name:string){
  const url = `${base_url}/category/create-category`;
  return this.http.post(url,{name},this.headers)
}

actualizarCategoria(_id:string,name:string){
  const url = `${base_url}/category/edit-category/${_id}`;
  return this.http.put(url,{name},this.headers)
}
eliminarCategoria(_id:string){
  const url = `${base_url}/category/delete-category/${_id}`;
  return this.http.delete(url,this.headers)
}
}
