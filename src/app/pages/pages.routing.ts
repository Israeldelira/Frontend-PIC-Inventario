import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { Usuario } from '../models/usuario.model';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { EntradasComponent } from './almacen/entradas/entradas.component';
import { MovimientosComponent } from './almacen/movimientos/movimientos.component';
import { SalidasComponent } from './almacen/salidas/salidas.component';
import { ArticuloComponent } from './articulos/articulo.component';
import { ArticulosComponent } from './articulos/articulos.component';
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

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
            {path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
            { path: 'articulos', component: ArticulosComponent,data:{titulo:'Articulos'} },
            { path: 'articulo/:id', component: ArticuloComponent,data:{titulo:'Articulo'} },
            //Proyectos
            { path: 'proyectos', component: ProyectosComponent ,data:{titulo:'Proyectos'} },
            { path: 'proyecto/:id', component: ProyectoComponent ,data:{titulo:'Proyecto'} },

            { path: 'graficas', component: Grafica1Component ,data:{titulo:'Graficas'} },
            { path: 'account-settings', component: AccountSettingsComponent,data:{titulo:'Configuracion de cuenta'} },
            { path: 'perfil', component: PerfilComponent,data:{titulo:'Perfil'} },
            { path: 'provedores', component: ProvedoresComponent ,data:{titulo:'Provedores'} },
            { path: 'provedor/:id', component: ProvedorComponent ,data:{titulo:'Provedor'} },
            //Mantenimientos de usuario
            {path:'usuarios', component:UsuariosComponent,data:{titulo:'Usuarios de la aplicacion'}},
            {path:'categorias', component:CategoriasComponent,data:{titulo:' Categorias de los articulos'}},
            //Almacen
            {path:'movimientos', component:MovimientosComponent,data:{titulo:'Crear movimientos'}},
            {path:'entradas/:id', component:EntradasComponent,data:{titulo:'Entradas de almacen'}},
            {path:'salidas/:id', component:SalidasComponent,data:{titulo:'Salidas de almacen'}},


        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        FormsModule,CommonModule,
        BrowserModule],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
