import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TokenExpiredDialogComponent } from '../components/token-expired-dialog/token-expired-dialog.component';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private _dialog: MatDialog,
    private _httpService: HttpService,
    public router:Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Token');
    const refreshToken = localStorage.getItem('RefreshToken');

    if (token && refreshToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            return this.handleTokenExpired();
          }  else if (error.status === 400) {
            localStorage.clear();
            this.router.navigateByUrl("/login-page");
          }
          return throwError(error);
        })
      );
    }
    return next.handle(req);
  }

  private handleTokenExpired(): Observable<any> {
    const dialogRef = this._dialog.open(TokenExpiredDialogComponent, {
      width: '300px',
    });

    return dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result ==='refresh') {
          return this._httpService.refreshToken()
          .pipe(
            tap((newToken: string) => {
              localStorage.setItem('Token', newToken);
              window.location.reload();
            }),
            catchError((error: any) => {
              return throwError('Failed to refresh token');
            })
          );
        } else {
          localStorage.removeItem('Token');
          localStorage.removeItem('RefreshToken');
          window.location.href = '/login';
          return throwError('Logged out');
        }
      }),
      catchError(error => {
        return throwError('Your token has expired.');
      })
    );
  }
}
