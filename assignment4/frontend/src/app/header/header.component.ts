import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {

  sub: Subscription = new Subscription;
  constructor(private authservice: AuthService, private router: Router) { }
  login: boolean = false;


  ngOnInit() {
    let authObs: Observable<any>;
    authObs = this.authservice.autologin()
    authObs.subscribe({
      next: (v) => {
        console.log(v.access_token);
        this.authservice.LoginMode.next(true);
        localStorage.setItem("access_token", v.access_token);
      },
      error: (e) => {
        console.log(e);
      }
    })
    this.sub = this.authservice.LoginMode.subscribe(e => {
      this.login = e;
      console.log(this.login)
    })

  }


  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onLogout() {
    localStorage.clear();
    this.authservice.LoginMode.next(false);
    this.router.navigate(["/auth"]);
  }
}
