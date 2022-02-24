import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppResponseCode } from "../../../shared/shared-constant";
import { RoutesList } from "../app/routes/routes";
import { accessToken } from "../environments/constant";
import { AuthProvider } from "../services/auth-provider";
import { EventsHandler } from "../services/events.handler";
import { GenericResponse, LoginResponse } from "./api-client.generated";
@Injectable()
export class HttpInterceptor {
    constructor(
        private http: HttpClient,
        private authProvider: AuthProvider,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (typeof localStorage !== 'undefined') {
            const jwtToken = localStorage.getItem(accessToken);
            if (jwtToken) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
            }
        }
        let handle = next.handle(request);
        return handle.pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.headers.get('content-type')
                        && event.headers.get('content-type').indexOf('application/json') !== -1) {
                        try {
                            const genericResponse: GenericResponse = event.body;
                            const fromRefreshToken = request.url.indexOf('/auth/refresh-token') !== -1;
                            if (genericResponse && !genericResponse.success && !genericResponse.message)
                                genericResponse.message = "Une erreur s'est produite";
                            console.log("🚀 ~ HttpInterceptor ~ &&event.headers.get ~ genericResponse", genericResponse);
                            if (genericResponse.token || fromRefreshToken)
                                EventsHandler.HandleLoginResponseEvent.next({ response: genericResponse as LoginResponse, fromRefreshToken: fromRefreshToken, forceLogout: false });
                        }
                        catch (err) {
                        }
                    }
                }
                return event;
            }),
            catchError(err => {
                if (err?.headers?.get('nxs-ignore-interceptor')) {
                    return of(new HttpResponse<GenericResponse>({ body: err?.body, headers: err.headers, status: err.status, statusText: err.statusText }));
                }
                let errorMessage = '';
                let statusCode = 500;
                if (err instanceof HttpErrorResponse) {
                    errorMessage = (err as HttpErrorResponse).message;
                    statusCode = (err as HttpErrorResponse).status;
                }
                if (statusCode === 403) {
                    if (err?.error?.statusCode === AppResponseCode.ExpiredToken)
                        EventsHandler.ForceLogoutEvent.next(err?.error?.message);

                    if (err?.error?.message)
                        errorMessage = 'Vous avez été déconnecté : ' + err.error.message;
                    localStorage.clear();
                    this.router.navigateByUrl('/' + RoutesList.Login);
                }
                return of(new HttpResponse<GenericResponse>({ body: { message: errorMessage, success: false, statusCode: statusCode } }));

            }));
    }
}