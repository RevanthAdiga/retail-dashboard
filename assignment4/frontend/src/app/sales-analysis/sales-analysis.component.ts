import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sales-analysis',
  templateUrl: './sales-analysis.component.html',
  styleUrls: ['./sales-analysis.component.css']
})
export class SalesAnalysisComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  sales = 'click here';
  visitors = 'click here';
  amount = 'click here';


  ngOnInit(): void {
  }

  TodaysSales() {
    this.authService.getSales().subscribe({
      next: (v) => {
        this.sales = String(v);
      },
      error: (e) => {
        console.log(e);

      }
    })
  }
  UniqueVisitors() {
    this.authService.getVisitors().subscribe({
      next: (v) => {
        this.visitors = String(v);
      },
      error: (e) => {
        console.log(e);

      }
    })
  }
  avgAmount() {
    this.amount = String(Number(this.sales) / Number(this.visitors));
  }
}
