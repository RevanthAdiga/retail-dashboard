import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }
    token = localStorage.getItem("refresh_token");
    LoginMode = new BehaviorSubject<boolean>(false);

    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        skip: "true",
    });
    options = { headers: this.headers };
    option = { headers: this.header };

    signup(firstname: string, lastname: string, username: string, password: string) {
        return this.http
            .post("http://127.0.0.1:5000/register"
                ,
                {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: password
                }
                , this.options
            )
            ;
    }

    login(username: string, password: string) {
        return this.http
            .post("http://127.0.0.1:5000/auth"
                ,
                {
                    username: username,
                    password: password
                }
                , this.options
            )
            ;
    }
    autologin() {

        return this.http.post("http://127.0.0.1:5000/refresh", {},

            this.option);
    }
    getSales() {
        return this.http.get("http://127.0.0.1:5000/salesToday");
    }
    getVisitors() {
        return this.http.get("http://127.0.0.1:5000/Uniquevisitors");
    }

}