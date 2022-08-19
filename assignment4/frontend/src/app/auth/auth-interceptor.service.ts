import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('access_token');
        // you probably want to store it in localStorage or something
        const skipIntercept = req.headers.has('skip');

        if (skipIntercept) {
            req = req.clone({
                headers: req.headers.delete('skip')
            });
            return next.handle(req);
        }
        if (!token) {
            return next.handle(req);
        }

        const req1 = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        return next.handle(req1);
    }

}
