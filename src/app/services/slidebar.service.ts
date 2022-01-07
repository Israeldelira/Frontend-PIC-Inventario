import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlidebarService {

  public menu=[]

  cargarMenu(){
    this.menu =JSON.parse(localStorage.getItem('menu')) || [];
    // if(this.menu.length===0){

    // }
  }

  // menu: any[] = [
  //   {

  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Menu principal', url: '/' },
  //       // { titulo: 'Graficas', url: '/dashboard/graficas' },
  //     ]
  //   },
  //   {

  //     titulo: 'Articulos',
  //     icono: 'mdi mdi-cards',
  //     submenu: [
  //       { titulo: 'Todos los articulos', url: '/dashboard/articulos' },
  //       { titulo: 'Agregar articulo', url: '/dashboard/articulo/nuevo' },
     
  //     ]
  //   },
  //   {

  //     titulo: 'Provedores',
  //     icono: 'mdi mdi-book-open',
  //     submenu: [
  //       { titulo: 'Todos los provedores', url: '/dashboard/provedores'},
  //       { titulo: 'Agregar provedor', url: '/dashboard/provedor/nuevo'},

  //     ]
  //   },
  //   {

  //     titulo: 'Proyectos',
  //     icono: 'mdi mdi-briefcase',
  //     submenu: [
  //       { titulo: 'Todos los proyectos', url: '/dashboard/proyectos' },
  //       { titulo: 'Registrar proyecto', url: '/dashboard/proyecto/nuevo' },
  
  //     ]
  //   },
  //   {

  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/dashboard/usuarios' },
  //       { titulo: 'Categorias', url: '/dashboard/categorias' },
  //     ]
  //   },
  //   {

  //     titulo: 'Almacen',
  //     icono: 'mdi mdi-archive',
  //     submenu: [
  //       { titulo: 'Informacion de almacen', url: '/dashboard/movimientos' },
  //       { titulo: 'Entradas', url: '/dashboard/entradas/vacio' },
  //       { titulo: 'Salidas', url: '/dashboard/salidas/vacio' },
     
  //     ]
  //   }
  // ]
 
}
