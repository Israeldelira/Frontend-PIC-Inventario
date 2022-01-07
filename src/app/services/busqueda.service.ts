import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Articulo } from '../models/articulos.model';
import { Bajas } from '../models/bajas.model';
import { Categoria } from '../models/categoria.model';
import { Entradas } from '../models/entradas.model';
import { Provedor } from '../models/provedores.model';
import { Proyecto } from '../models/proyecto.models';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {


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
  private transformarUsuarios(resultado: any[]): Usuario[] {
    return resultado.map(
      user => new Usuario(
        user._id,
        user.nombre,
        user.user,
        '',
        user.role,
        user.img,
        user.status)
    );
  }
  private transformarCategorias(resultado: any[]): Categoria[] {
    return resultado;

  }
  private transformarArticulos(resultado: any[]): Articulo[] {
    return resultado;

  }
  private transformarProvedores(result: any[]): Provedor[] {
    return result;
  }
  private transformarBajas(result: any[]): Bajas[] {
    return result;
  }
  private transformarEntradas(result: any[]): Entradas[] {
    return result;
  } 
  private transformarProyectos(result: any[]): Proyecto[] {
    return result;
  } 



busquedaGeneral(termino:string){
  const url = `${base_url}/search/${termino}/`;
  return this.http.get<any[]>(url, this.headers)
}

  buscar(

    type: 'users' | 'articles' | 'categorys' | 'providers'| 'bajas'| 'inputs' | 'projects',
    searchData: string = ''
  ): Observable<any[]> {

    const url = `${base_url}/search/collection/${type}/${searchData}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (type) {
            case 'users':
              return this.transformarUsuarios(resp.resultado)

            case 'categorys':
              return this.transformarCategorias(resp.resultado)

            case 'providers':
              return this.transformarProvedores(resp.resultado)
            case 'articles':
              return this.transformarArticulos(resp.resultado)
            case 'bajas':
                return this.transformarBajas(resp.resultado)
            case 'inputs':
                  return this.transformarEntradas(resp.resultado)
            case 'projects':
                  return this.transformarProyectos(resp.resultado)
            default:
              return [];
          }

        })
      );

  }


  // buscar(
  //   type: 'users' | 'articles' | 'categorys',
  //   searchData: string = '') {
  //   const url = `${base_url}/search/collection/${type}/${searchData}`;
  //   return this.http.get<any[]>(url, this.headers)
  //     .pipe(
  //       map((resp: any) => {


  //         switch (type) {
  //           case 'users':
  //             return this.transformarUsuarios(resp.resultado)

  //             break;
  //           case 'categorys':
  //             return this.transformarCategorias(resp.resultado)
  //             break;
  //           default:
  //             return []
  //         }
  //       })
  //     )
  // }
}
