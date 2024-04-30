import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {RestURL} from "./system/shared/RestURL";

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === RestURL.login) {
      return next.handle(request);
    } else {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.getAuthToken())
      });

      return next.handle(authReq);
    }
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth_token');
  }
}
