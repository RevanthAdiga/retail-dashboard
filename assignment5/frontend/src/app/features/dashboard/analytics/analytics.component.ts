import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AnalyticsService } from '../dashboard.service';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  data: any;
  ordered:any;
  areaCharts = ['first', 'second', 'third', 'fourth'];
  // private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private dashboard: AnalyticsService,
    private _router: Router
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.dashboard.shotByRace()
    .subscribe((response)=>{
      localStorage.setItem("chart1Key",JSON.stringify(Object.keys(JSON.parse(response))));
      localStorage.setItem("chart1Value",JSON.stringify(Object.values(JSON.parse(response))));
    })
    this.dashboard.topCityShootings()
    .subscribe((response)=>{
      localStorage.setItem("chart2Key",JSON.stringify(Object.keys(JSON.parse(response))));
      localStorage.setItem("chart2Value",JSON.stringify(Object.values(JSON.parse(response))));
    })
    this.dashboard.ageDistribution()
    .subscribe((response)=>{
      this.data=JSON.parse(response);
      this.ordered=Object.keys(this.data).sort().reduce(
        (obj , key) => { 
          obj[key] = this.data[key]; 
          return obj;
        },{}
      );
      localStorage.setItem("chart3Key",JSON.stringify(Object.keys(this.ordered)));
      localStorage.setItem("chart3Value",JSON.stringify(Object.values(this.ordered)));
    })
    this.dashboard.mannerOfDeath()
    .subscribe((response)=>{
      localStorage.setItem("Piechart1Key",JSON.stringify(Object.keys(JSON.parse(response))));
      localStorage.setItem("Piechart1Value",JSON.stringify(Object.values(JSON.parse(response))));
    })
    this.dashboard.mentalIllness()
    .subscribe((response)=>{
      localStorage.setItem("Piechart2Key",JSON.stringify(Object.keys(JSON.parse(response))));
      localStorage.setItem("Piechart2Value",JSON.stringify(Object.values(JSON.parse(response))));
    })
    this.dashboard.threatLevel()
    .subscribe((response)=>{
      localStorage.setItem("Piechart3Key",JSON.stringify(Object.keys(JSON.parse(response))));
      localStorage.setItem("Piechart3Value",JSON.stringify(Object.values(JSON.parse(response))));
    })
    this.dashboard.armsCategory()
    .subscribe((response)=>{
      localStorage.setItem("chart4Key",JSON.stringify(Object.keys(JSON.parse(response))));
      localStorage.setItem("chart4Value",JSON.stringify(Object.values(JSON.parse(response))));
    })
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    // this._unsubscribeAll.next(null);
    // this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Fix the SVG fill references. This fix must be applied to all ApexCharts
   * charts in order to fix 'black color on gradient fills on certain browsers'
   * issue caused by the '<base>' tag.
   *
   * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
   *
   * @param element
   * @private
   */
}
