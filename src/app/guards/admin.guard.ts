import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private usuarioService:UsuarioService,
    private router:Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.usuarioService.roleUser==='ADMIN')
    return true;

    else{
      Swal.fire({
        title: 'Alerta',
        text: `Ops... Parece que estas perdido, no estas autorizado`,
        icon: 'warning',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Entendido',
        timer: 3500,
      })
      this.router.navigateByUrl('/dashboard')
    }
    //Otra opcion con operadores 
      // return (this.usuarioService.roleUser==='ADMIN')? true:false;
  }
  
}
