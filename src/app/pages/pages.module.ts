
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';

import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';

import { Grafica1Component } from './grafica1/grafica1.component';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ArticulosComponent,
    ProyectosComponent,
    PagesComponent,
    Grafica1Component,
    AccountSettingsComponent,
  ],
  exports:[
    DashboardComponent,
    ArticulosComponent,
    ProyectosComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
