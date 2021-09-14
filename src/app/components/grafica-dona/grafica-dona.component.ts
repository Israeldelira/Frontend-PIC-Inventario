import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label , Color} from 'ng2-charts';
@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styleUrls: ['./grafica-dona.component.css']
})
export class GraficaDonaComponent  {

  @Input() title:String='Sin titulo';
  @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
   
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public colors:Color[]=[
    {backgroundColor:['#13AB23','#1351AB','#B90D1D']}
  ]
}
