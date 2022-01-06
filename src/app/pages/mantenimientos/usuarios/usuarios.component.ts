import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'

})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[]=[]
  public usuariosTemp: Usuario[] = [];
  public pagination: number = 0;
  public cargando: boolean = true;
  public imgSubs?:Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService,
    private modalImagService:ModalImagenService
    ) { }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargando = true;
    this.cargarUsuarios();
    this.imgSubs= this.modalImagService.nuevaImagen
    .pipe(delay(200))
    .subscribe(img => 
this.cargarUsuarios());
    
  }
  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.pagination)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number) {
    console.log("este es el valor" + valor)
    this.pagination += valor;
    if (this.pagination < 0) {
      this.pagination = 0;
    } else if (this.pagination >= this.totalUsuarios) {
      this.pagination -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
    
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('users', termino)
      .subscribe(resp => {
        this.usuarios = resp
      });
  }

  eliminarUsuario(usuario:Usuario){
    console.log(this.usuarioService.id)
    if(usuario._id===this.usuarioService.id){
      return  Swal.fire({
        title: 'Error',
        text: `No te puedes borrar a si mismo`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
    Swal.fire({
      title: '¿Deseas eliminar al usuario?',
      text: `Eliminar usuario: ${usuario.user} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#C8CBCA',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario).subscribe(
          resp=>  {
            this.cargarUsuarios();
            Swal.fire({
              title: 'Eliminado',
              text: `El usuario ${usuario.user} se elimino de manera correcta`,
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          }
        )
      
      }
    })
  }
  activar(usuario:Usuario){
    console.log(this.usuarioService.id)
    if(usuario._id===this.usuarioService.id){
      return  Swal.fire({
        title: 'Error',
        text: `Ya estas activado`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
    Swal.fire({
      title: 'Activar usuario',
      text: `¿Deseas activar el usuario: ${usuario.user} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#C8CBCA',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        usuario.activate=true
        this.usuarioService.guardarActualizacionUsuario(usuario).subscribe(
          resp=>  {
            this.cargarUsuarios();
            Swal.fire({
              title: 'Activado',
              text: `El usuario ${usuario.user} se activo de manera correcta`,
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          }
        )
      
      }
    })
  }

  desactivar(usuario:Usuario){
    console.log(this.usuarioService.id)
    if(usuario._id===this.usuarioService.id){
      return  Swal.fire({
        title: 'Error',
        text: `No puedes desactivar tu propio usuario`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
    Swal.fire({
      title: 'Desactivar usuario',
      text: `¿Deseas desactivar el usuario: ${usuario.user} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#C8CBCA',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        usuario.activate=false
        this.usuarioService.guardarActualizacionUsuario(usuario).subscribe(
          resp=>  {
            this.cargarUsuarios();
            Swal.fire({
              title: 'Desctivado',
              text: `El usuario ${usuario.user} se activo de manera correcta`,
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          }
        )
      
      }
    })
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarActualizacionUsuario(usuario)
    .subscribe(resp=>{
    console.log(resp)
    })
  }
  abrirModal(usuario:Usuario){
    console.log(usuario);
    this.modalImagService.abrirModal('users',usuario._id,usuario.img);
  }
  }

