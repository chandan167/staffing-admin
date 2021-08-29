import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenData } from 'src/app/interface/auth.interface';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private userlogin: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.token$.subscribe((data: TokenData) => {
      this.userlogin = !!data?.access_token;
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userlogin) {
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }

}
