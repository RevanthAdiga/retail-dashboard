import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { AnalyticsService } from 'src/app/features/dashboard/dashboard.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() chartUrl = '';
  _chartOption: EChartsOption = {};
  private showLegend: boolean = true;
  // private Obs : Observable<any> = new Observable;


  constructor(private dashboard:AnalyticsService) {}

  ngOnInit() {
    let data_key: any= [];
    let data:any=[];
   
    
    if (this.chartUrl === 'first') {
      data_key=JSON.parse(localStorage.getItem("chart1Key")|| "{}");
      data=JSON.parse(localStorage.getItem("chart1Value")|| "{}");
      this.loadChart(data_key,data);
      this.showLegend = false;
    }
    if (this.chartUrl === 'second') {
      data_key=JSON.parse(localStorage.getItem("chart2Key")|| "{}");
      data=JSON.parse(localStorage.getItem("chart2Value")|| "{}");
      this.showLegend = false;
      this.loadChart(data_key,data);
    }
    if (this.chartUrl === 'third') {
      data_key=JSON.parse(localStorage.getItem("chart3Key")|| "{}");
      data=JSON.parse(localStorage.getItem("chart3Value")|| "{}");
      this.showLegend = false;
      this.loadChart(data_key,data);
    }
    if (this.chartUrl === 'fourth') {
      data_key=JSON.parse(localStorage.getItem("chart4Key")|| "{}");
      data=JSON.parse(localStorage.getItem("chart4Value")|| "{}");
      this.showLegend = false;
      this.loadChartInverse(data_key,data);
    }

  }
  private loadChartInverse(data_key:any,data:any):void{
    this._chartOption = {
      yAxis: {
        type:"category",
        boundaryGap: true,
        data: data_key,
        //show: this.showLegend
      },
      xAxis: {
        type: 'value',
        //show: this.showLegend
      },
      series: [
        {
          data: data,
          type: 'bar',
          
        },
      ],
    };
  }

  private loadChart(data_key: any,data:any): void {
    this._chartOption = {
      xAxis: {
        type:"category",
        boundaryGap: true,
        data: data_key,
        //show: this.showLegend
      },
      yAxis: {
        type: 'value',
        //show: this.showLegend
      },
      series: [
        {
          data: data,
          type: 'bar',
          
        },
      ],
    };
  }
  }

