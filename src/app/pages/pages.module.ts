
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';

import { Grafica1Component } from './grafica1/grafica1.component';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BrowserModule } from '@angular/platform-browser';
import { CategoriasComponent } from './mantenimientos/categorias/categorias.component';
import { ProvedoresComponent } from './provedores/provedores.component';
import { ProvedorComponent } from './provedores/provedor.component';
import { ArticuloComponent } from './articulos/articulo.component';
import { ProyectoComponent } from './proyectos/proyecto.component';
import { EntradasComponent } from './almacen/entradas/entradas.component';
import { SalidasComponent } from './almacen/salidas/salidas.component';
import { MovimientosComponent } from './almacen/movimientos/movimientos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ProyectoBajasComponent } from './proyecto-bajas/proyecto-bajas.component';





@NgModule({
  
  declarations: [
    DashboardComponent,
    ArticulosComponent,
    ProyectosComponent,
    PagesComponent,
    Grafica1Component,
    AccountSettingsComponent,
    PerfilComponent,
    UsuariosComponent,
    CategoriasComponent,
    ProvedoresComponent,
    ProvedorComponent,
    ArticuloComponent,
    ProyectoComponent,
    EntradasComponent,
    SalidasComponent,
    MovimientosComponent,
    BusquedaComponent,
    ProyectoBajasComponent,

 
  
  ],
  exports:[
    DashboardComponent,
    ArticulosComponent,
    ProyectosComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    
    BrowserModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
