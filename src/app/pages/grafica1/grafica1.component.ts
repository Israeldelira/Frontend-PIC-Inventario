import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {

  public labels1: string[] = ['Encargado', 'Salidas', 'Regreso'];
 
  public data1 = [
    [2, 50, 25],
  ];
  public labels2: string[] = ['Entradas', 'Salidas', 'Regreso'];
  public data2 = [
    [100, 500, 25],
  ];
}
