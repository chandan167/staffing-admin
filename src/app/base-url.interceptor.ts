import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest: HttpRequest<unknown>
    if (request.headers.get('skip')) {
      newRequest = request.clone()
    } else {
      newRequest = request.clone({
        url: environment.baseUrl+request.url
      })
    }
    return next.handle(newRequest);
  }
}
