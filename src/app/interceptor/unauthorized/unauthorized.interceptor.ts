import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { TokenData } from 'src/app/interface/auth.interface';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  private token: string = '';
  constructor(private authService: AuthService, private router: Router ) {
    this.authService.token$.subscribe((data: TokenData) => {
      this.token = `${data?.token_type} ${data?.access_token}`
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let newRequest: HttpRequest<unknown>
    if (request.headers.get('skip')) {
      newRequest = request.clone()
    } else {
      newRequest = request.clone({
        headers: request.headers.append('Authorization', this.token)
      })
    }
    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized) {
          this.authService.removerToken();
          this.router.navigate(['/login']);
        }
        throw error
      })
    );
  }
}
