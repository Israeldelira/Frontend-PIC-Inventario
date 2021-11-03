import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaBarrasComponent } from './grafica-barras/grafica-barras.component';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    GraficaBarrasComponent,
    GraficaDonaComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[
    GraficaBarrasComponent,
    GraficaDonaComponent,
    ModalImagenComponent
  ]
})
export class ComponentsModule { }
