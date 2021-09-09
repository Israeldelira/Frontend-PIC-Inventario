import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    DashboardComponent,
    ArticulosComponent,
    ProyectosComponent,
    PagesComponent,
  ],
  exports:[
    DashboardComponent,
    ArticulosComponent,
    ProyectosComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
