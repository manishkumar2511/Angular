import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { LoderService } from './loder.service';

@Injectable({
  providedIn: 'root'
})
export class LoderInterceptorService implements HttpInterceptor {

  constructor(public loaderService:LoderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isloading.next(true);
    return next.handle(req).pipe(
      finalize(
        ()=>{
          delay(10000),
          this.loaderService.isloading.next(false);
        }
      )
    )
  }
}
