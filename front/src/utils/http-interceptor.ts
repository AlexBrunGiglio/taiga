import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../providers/api-client.generated';
import { LocalStorageService } from './services/local-storage.service';
import { accessToken } from './constant';
import { AppCookieService } from './services/app-cookie.service';
import { AuthDataService } from './services/auth-data.service';
import { AuthProvider } from './services/auth-provider';
const TOKEN_HEADER_KEY = 'x-access-token';    // for Node.js Express back-end
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(
        private authService: AuthService,
        private appCookieService: AppCookieService,
        private authProvider: AuthProvider,
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        let authReq = req;
        const token = LocalStorageService.getFromLocalStorage(accessToken);
        if (token != null) {
            authReq = this.addTokenHeader(req, token);
        }
        return next.handle(authReq).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/login') && error.status === 401) {
                return this.handle401Error(authReq, next);
            }
            return throwError(error);
        }));
    }
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            const token = this.appCookieService.get(accessToken);
            if (token)
                return this.authService.refreshToken({ refreshToken: token }).pipe(
                    switchMap((token: any) => {
                        this.isRefreshing = false;
                        LocalStorageService.saveInLocalStorage(accessToken, token.accessToken);
                        this.refreshTokenSubject.next(token.accessToken);
                        return next.handle(this.addTokenHeader(request, token.accessToken));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;
                        this.authProvider.logout();
                        return throwError(err);
                    })
                );
        }
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }
    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}