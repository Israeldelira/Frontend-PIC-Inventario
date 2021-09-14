import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaBarrasComponent } from './grafica-barras/grafica-barras.component';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    GraficaBarrasComponent,
    GraficaDonaComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[
    GraficaBarrasComponent,
    GraficaDonaComponent
  ]
})
export class ComponentsModule { }
