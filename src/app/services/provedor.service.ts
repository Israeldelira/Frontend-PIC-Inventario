import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { allProvedor, CargarProvedor, getProvedor, Provedor } from '../models/provedores.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProvedorService {

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
  cargarProvedores(pagination:number=0){
    const url = `${base_url}/provider/get-providers?pagination=${pagination}`;
    return this.http.get<CargarProvedor>(url, this.headers)
  .pipe(
    map(resp=>{
      const provedores=resp.allProviders
        console.log(provedores)
        return{
          total:resp.total,
          provedores
        }
      
    })
  );
}
obtenerProvedores() {
  return this.http.get<allProvedor>(`${ base_url }/provider/get-providersAll`,this.headers)
  .pipe(
    map(resp=>{
      const provedores=resp.providers
      return provedores
    })
  );
}

crearProvedor(provedor: { name: string, address: string, phone: number }){
  const url = `${base_url}/provider/create-provider`;
  return this.http.post(url,provedor,this.headers)
}

actualizarProvedor(provedor:Provedor){
  const url = `${base_url}/provider/edit-provider/${provedor._id}`;
  return this.http.put(url,provedor,this.headers)
}
eliminarProvedor(_id:string){
  const url = `${base_url}/provider/delete-provider/${_id}`;
  return this.http.delete(url,this.headers)
}
// obtenerProvedor(_id:string){
//   const url = `${base_url}/provider/get-provider/${_id}`;
//   return this.http.get<getProvedor>(url,this.headers)
//   .pipe(
//     map(resp=>{
//       const provedor=resp.provider
//         console.log(provedor)
//         return{
          
//           provedor
//         }
      
//     })
//   );
// }
obtenerProvedor(_id:string){
  const url = `${base_url}/provider/get-provider/${_id}`;
  return this.http.get<getProvedor>(url,this.headers)
  .pipe(
    map(provider=>{
      const provedor=provider
        console.log(provedor)
        return{
          provedor
        }
    })
  );
}
}
