import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { EntradasComponent } from './almacen/entradas/entradas.component';
import { MovimientosComponent } from './almacen/movimientos/movimientos.component';
import { SalidasComponent } from './almacen/salidas/salidas.component';
import { ArticuloComponent } from './articulos/articulo.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { CategoriasComponent } from './mantenimientos/categorias/categorias.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProvedorComponent } from './provedores/provedor.component';
import { ProvedoresComponent } from './provedores/provedores.component';
import { ProyectoComponent } from './proyectos/proyecto.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { ProyectoBajasComponent } from './proyecto-bajas/proyecto-bajas.component';



const childrenRoutes: Routes = [
  {path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
            { path: 'articulos', component: ArticulosComponent,data:{titulo:'Articulos del almacen'} },
            { path: 'articulo/:id',canActivate:[AdminGuard], component: ArticuloComponent,data:{titulo:'Articulo'} },

            //Busqueda general
            { path: 'busqueda/:termino',canActivate:[AdminGuard], component: BusquedaComponent,data:{titulo:'Busqueda general'} },


            //Proyectos
            { path: 'proyectos',canActivate:[AdminGuard], component: ProyectosComponent ,data:{titulo:'Proyectos'} },
            { path: 'proyecto/:id',canActivate:[AdminGuard], component: ProyectoComponent ,data:{titulo:'Proyecto'} },
            { path: 'proyecto-bajas/:id',canActivate:[AdminGuard], component: ProyectoBajasComponent ,data:{titulo:'Informacion de bajas del proyecto'} },

            { path: 'graficas',canActivate:[AdminGuard], component: Grafica1Component ,data:{titulo:'Graficas'} },
            { path: 'account-settings', component: AccountSettingsComponent,data:{titulo:'Configuracion de cuenta'} },
            { path: 'perfil', component: PerfilComponent,data:{titulo:'Mi perfil'} },
            { path: 'provedores',canActivate:[AdminGuard], component: ProvedoresComponent ,data:{titulo:'Provedores'} },
            { path: 'provedor/:id',canActivate:[AdminGuard],  component: ProvedorComponent ,data:{titulo:'Provedor'} },
            //Mantenimientos de usuario
            {path:'usuarios', canActivate:[AdminGuard], component:UsuariosComponent,data:{titulo:'Usuarios de la aplicacion'}},
            {path:'categorias',canActivate:[AdminGuard], component:CategoriasComponent,data:{titulo:' Categorias de los articulos'}},
            //Almacen
            {path:'entradas/:id', canActivate:[AdminGuard], component:EntradasComponent,data:{titulo:'Entradas de almacen'}},
            {path:'salidas/:id', canActivate:[AdminGuard], component:SalidasComponent,data:{titulo:'Salidas de almacen'}},

]
@NgModule({
  imports: [RouterModule.forChild(childrenRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
