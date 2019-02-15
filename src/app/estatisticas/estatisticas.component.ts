import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'protractor';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent implements OnInit {

  constructor(public http: HttpClient) { }
  private servidor: string = 'http://192.168.1.36:5000';

  ngOnInit() {
    this.estatisticas();
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartColors: Array<any> = [
    { // orange
      backgroundColor: '#c97941',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#c97941',
      pointHoverBackgroundColor: '#c97941',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public barChartData: any[] = [
    { data: [], label: 'UF' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  private estatisticas() {
    let estados = []
    let probas = []

    this.http.get(this.servidor + '/estados/proba')
      .subscribe((data: Config) => {
        // data = JSON.parse(data);

        for (let i = 0; i < data.length; i++) {
          estados.push(data[i][0]);
          probas.push(data[i][1])
        }

        this.barChartLabels = estados
        this.barChartData[0].data = probas

      }, (error) => {
        console.log(error);

      })
  }
}
