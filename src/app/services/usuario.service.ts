import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form-interface';
import { RegisterForm } from '../interfaces/register-form-interface';
import { Usuario } from '../models/usuario.model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!:Usuario;

  constructor(
    private http:HttpClient,
    private router:Router) {}

    get token():string{
      return  localStorage.getItem('token')||'';
    }

    get id():string{
      return this.usuario._id || '';
    }
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }

validarToken():Observable<boolean>{
  return this.http.get(`${base_url}/login/renew`,{
    headers:{
'x-token':this.token
    }
}).pipe(
  tap((resp:any) =>{
console.log('esta es el id')
    const {_id,nombre,user,role,img}=resp.user
    this.usuario=new Usuario(_id,role,nombre,user,'', img);
    // console.log("este es mi prueba"+resp.user.nombre);
    localStorage.setItem('token',resp.token)
  }),
  map(resp=>true),
  catchError(error=>of(false))
);
}

  crearUsuario(formData:RegisterForm){

   return this.http.post(`${base_url}/usuarios/create-users`,formData)
   .pipe(
    tap((resp:any) =>{
      localStorage.setItem('token',resp.token)
    }
  ));
  }

  actualizarUsuario(data:{nombre:string,user:string,role:string}){
    data={
      ...data,
      role:this.usuario.role
    };
    
    console.log("no se envia nada ",this.usuario._id)
    return this.http.put(`${base_url}/usuarios/edit-user/${this.id}`,data,{
      headers:{
        'x-token':this.token
            }

    });

  }

  login(formData:LoginForm){
    return this.http.post(`${base_url}/login`,formData)
    .pipe(
      tap((resp:any) =>{
        localStorage.setItem('token',resp.token)
      }
    ));
  }
}
