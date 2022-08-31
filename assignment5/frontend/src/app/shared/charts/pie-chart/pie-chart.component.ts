import { Component, OnInit, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() chartUrl = '';
  _chartOption: EChartsOption = {};

  constructor() {}

  ngOnInit() {
    let data_key: any= [];
    let data:any=[];
    if (this.chartUrl === 'first') {
      data_key=JSON.parse(localStorage.getItem("Piechart1Key")|| "{}");
      data=JSON.parse(localStorage.getItem("Piechart1Value")|| "{}");
    }
    if (this.chartUrl === 'second') {
      data_key=["false","true"];
      data=JSON.parse(localStorage.getItem("Piechart2Value")|| "{}");
    }
    if (this.chartUrl === 'third') {
      data_key=JSON.parse(localStorage.getItem("Piechart3Key")|| "{}");
      data=JSON.parse(localStorage.getItem("Piechart3Value")|| "{}");

  }
  this.loadPieChart(data_key,data);

  }
  private loadData(data_key:any,data:any){
    var arr:any=[];
    for ( var i=0;i<data_key.length;i++){
      arr.push({value:data[i],name:data_key[i]});
    }
    return arr;

  }
  private loadPieChart(data_key:any,data:any): void {
    console.log(data_key,data);
    console.log(this.loadData(data_key,data));
    this._chartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        //selectedMode: false,
        orient: 'vertical',
        //x: 'left',
        data: data_key
      },

      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'NOMBRE',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          data: this.loadData(data_key,data)
        },
      ],

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    };
  }
}
