import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { LoginForm } from '../interfaces/login-form-interface';
import { RegisterForm } from '../interfaces/register-form-interface';
import { allUsuarios, Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get id(): string {
    return this.usuario._id || '';
  }
  get roleUser():'ADMIN' | 'USER'{
    return this.usuario.role;
  }

  //Funcion para guardar en local storage
  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token)
    localStorage.setItem('menu', JSON.stringify(menu))
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login')
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap((resp: any) => {
        const { _id, nombre, user, role, img, status,activate } = resp.user
        this.usuario = new Usuario(_id,nombre, user, '', role,img, status,activate);
        // console.log("este es mi prueba"+resp.user.nombre);
        //Utilizmos funcion guardar en local estorage y mandamos la resp de cada valor
        // localStorage.setItem('token',resp.token)
        // localStorage.setItem('menu',resp.menu)
        this.guardarLocalStorage(resp.token, resp.menu)
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios/create-users`, formData)
      .pipe(
        tap((resp: any) => {
          // localStorage.setItem('token',resp.token)
          this.guardarLocalStorage(resp.token, resp.menu)
          //PENDIENTE AGREGAR EL MENU AL CREAR USUARO
        }
        ));
  }

  actualizarUsuario(data: { nombre: string, user: string, role: string }) {
    data = {
      ...data,
      role: this.usuario.role
    }
    console.log("no se envia nada ", this.usuario._id)
    return this.http.put(`${base_url}/usuarios/edit-user/${this.id}`, data, this.headers)

  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        }
        ));
  }

  cargarUsuarios(pagination: number = 0) {
    const url = `${base_url}/usuarios/get-users?pagination=${pagination}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(
              user._id,
              user.nombre,
              user.user,
              '',
              user.role,
              user.img,
              user.status,
              user.activate))
          console.log(usuarios)
          return {
            total: resp.total,
            usuarios
          }

        })
      )
  }


  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/delete-user/${usuario._id}`;
    return this.http.delete(url, this.headers)
  }

  guardarActualizacionUsuario(usuario: Usuario) {

    return this.http.put(`${base_url}/usuarios/edit-user/${usuario._id}`, usuario, this.headers)

  }
  obtenerTodosUsuarios() {
    return this.http.get<allUsuarios>(`${base_url}/usuarios/get-usersAll`, this.headers)
      .pipe(
        map(resp => {
          console.log(resp.users)
          const usuarios = resp.users
          console.log("servicio" + usuarios)
          return {
            usuarios
          }
        })
      );
  }

}
