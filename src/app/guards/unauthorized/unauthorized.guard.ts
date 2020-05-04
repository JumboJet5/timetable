import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree,
} from '@angular/router';
import { AuthService } from '@app/service/auth/auth.service';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UnauthorizedGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this._isAuthorized();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this._isAuthorized();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return !this._isAuthorized();
  }

  private _isAuthorized(): boolean {
    if (environment.production) return true;
    if (this.authService.isAuthorized()) this.router.navigate(['dashboard']);
    return this.authService.isAuthorized();
  }
}
