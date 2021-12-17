import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarBajas } from '../models/bajas.model';
import { CargarEntradas } from '../models/entradas.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  constructor(
    private http: HttpClient
  ) { }
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
  cargarBajas(pagination:number=0){
    const url = `${base_url}/warehouse/get-outputs?pagination=${pagination}`;
    return this.http.get<CargarBajas>(url, this.headers)
  .pipe(
    map(resp=>{
      const bajas=resp.outputs
  
        console.log("prueba de bajas"+bajas)
        return{
          total:resp.total,
          bajas
        }
      
    })
  );
}
cargarEntradas(pagination:number=0){
  const url = `${base_url}/warehouse/get-inputs?pagination=${pagination}`;
  return this.http.get<CargarEntradas>(url, this.headers)
.pipe(
  map(resp=>{
    const entradas=resp.inputs

      console.log("prueba de bajas"+entradas)
      return{
        total:resp.total,
        entradas
      }
    
  })
);
}

registrarBaja(baja: { article: string, project: string, description: string , quantity: number  }){
  const url = `${base_url}/warehouse/add-outputs`;
  return this.http.post(url,baja,this.headers)
}
registrarEntrada(entrada: { article: string , quantity: number  }){
  const url = `${base_url}/warehouse/add-inputs`;
  return this.http.post(url,entrada,this.headers)
}

}
