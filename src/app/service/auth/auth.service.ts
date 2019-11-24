import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormatService } from 'src/app/service/format/format.service';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class AuthService {
    private _authInfo: {token: string};

    constructor(private http: HttpClient,
                private formatService: FormatService) {}

    public login(body: {username: string, password: string}): Observable<boolean> {
        return this._getNewToken(body)
                   .pipe(
                       catchError(err => of(false)),
                       map(res => {
                           this._authInfo = typeof res !== 'boolean' ? res : undefined;
                           return true;
                       }),
                   );
    }

    public isAuthorized(): boolean {
        return !!this._authInfo;
    }

    public getToken(): string {
        return this.isAuthorized() ? this._authInfo.token : undefined;
    }

    private _getNewToken(body: {username: string, password: string}): Observable<{token: string}> {
        return this.http.post<{token: string}>(URLS.GET_NEW_TOKEN, this.formatService.getFormDataFromObject(body));
    }
}
