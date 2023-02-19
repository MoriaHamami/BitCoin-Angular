import { Component, Input } from '@angular/core';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: [ './graph.component.scss' ]
})
export class GraphComponent {
  @Input() chartData!: any
  @Input() options!: object

  public lineChartLegend = true;
}