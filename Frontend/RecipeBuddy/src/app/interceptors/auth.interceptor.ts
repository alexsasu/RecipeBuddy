import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const responseType = request.responseType || 'json';
        const token = localStorage.getItem('Token') || null;

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
                responseType
            });
        }

        return next.handle(request).pipe(
           catchError((error) => {
               if(error instanceof HttpErrorResponse) {
                   if(error.status === 401 || error.status === 403) {
                       localStorage.removeItem('Token');
                   }
               }
               throw new HttpErrorResponse(error);
           })
        );
    }
}