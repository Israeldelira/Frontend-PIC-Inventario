import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlidebarService {

  menu: any[] = [
    {

      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Menu principal', url: '/' },
        { titulo: 'Graficas', url: '/dashboard/graficas' },
        { titulo: 'Alertas', url: '/' }
      ]
    },
    {

      titulo: 'Articulos',
      icono: 'mdi mdi-cards',
      submenu: [
        { titulo: 'Todos los articulos', url: '/dashboard/articulos' },
        { titulo: 'Entradas', url: '/' },
        { titulo: 'Salidas', url: '/' }
      ]
    },
    {

      titulo: 'Proyectos',
      icono: 'mdi mdi-briefcase',
      submenu: [
        { titulo: 'Todos los proyectos', url: '/dashboard/proyectos' },
        { titulo: 'En proceso', url: '/' },
        { titulo: 'Terminados', url: '/' }
      ]
    }
  ]
  constructor() { }
}
