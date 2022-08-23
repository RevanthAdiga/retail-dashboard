import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  fp: string = "";
  lp: string = "";
  error: string = "";
  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // if (!form.valid) {
    //   return;
    // }
    const fname = form.value.firstname;
    const lname = form.value.lastname;
    const email = form.value.email;
    const password = form.value.fpassword;


    let authObs: Observable<any>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      authObs.subscribe({
        next: (v) => {
          console.log(v.access_token);
          console.log(v.refresh_token);
          localStorage.setItem("access_token", v.access_token);
          localStorage.setItem("refresh_token", v.refresh_token);
          this.authService.LoginMode.next(true);
          this.router.navigate(['/home']);
        },
        error: (e) => {
          console.log(e);
          this.error = "invalid credentials";
        }
      })

    } else {
      authObs = this.authService.signup(fname, lname, email, password);
      authObs.subscribe({
        next: (v) => {
          console.log(v);
          this.onSwitchMode();
        },
        error: (e) => {
          console.log(e);
          this.error = "user already exists";

        },
      })
    };


    // authObs.subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }


    form.reset();


  }
}

