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
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Todos los articulos', url: '/dashboard/articulos' },
        { titulo: 'Entradas', url: '/' },
        { titulo: 'Salidas', url: '/' }
      ]
    }
  ]
  constructor() { }
}
