import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private authService: AuthService) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this._getAuthorizeRequest(req))
                   .pipe(tap(
                       () => {},
                       err => err.status === 401 ? this.router.navigate(['authentication']) : null,
                   ));
    }

    private _getAuthorizeRequest(req: HttpRequest<any>, forth: boolean = false): HttpRequest<any> {
        const needUpdateAuthHeader = forth || (req.method !== 'GET'
            && !req.headers.get('Authorization') && this.authService.isAuthorized());
        const authHeader = 'Token ' + this.authService.getToken();
        return needUpdateAuthHeader ? req.clone({headers: req.headers.set('Authorization', authHeader)}) : req;
    }
}
