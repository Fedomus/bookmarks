import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from './services/login.service';
import { EventBusService } from './services/event-bus.service';
import { EventData } from './classes/event.class';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    private eventBusService: EventBusService
  ) {}

  private isRefreshing = false;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.loginService.getToken()
    if(token) {
      const clonedReq = request.clone({
        headers: request.headers.set('authorization', 'Bearer ' + token)
      });
      return next.handle(clonedReq).pipe(
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            error.status === 401
          ) {
            return this.handle401Error(clonedReq, next);
          }
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(request);
    }
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      if (this.loginService.checkAuth()) {
        this.eventBusService.emit(new EventData('logout', null));
      }
    }
    return next.handle(request);
  }
}

export const JwtInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
]