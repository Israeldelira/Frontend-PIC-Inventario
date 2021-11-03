import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
        user.role,
        user.nombre,
        user.user,
        '',
        user.img,
        user.status)
    );
  }
  buscar(
    type: 'users' | 'articles',
    searchData: string = '') {
    const url = `${base_url}/search/collection/${type}/${searchData}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {


          switch (type) {
            case 'users':
              return this.transformarUsuarios(resp.resultado)


            default:
              return []
          }
        })
      )
  }
}
