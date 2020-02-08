import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormatService } from 'src/app/service/format/format.service';
import * as URLS from 'src/core/urls';

@Injectable()
export class AuthService {
  private _authInfo: { token: string } = JSON.parse(localStorage.getItem('token')) || undefined;

  constructor(private http: HttpClient,
              private formatService: FormatService) {}

  public login(body: { username: string, password: string }): Observable<boolean> {
    return this._getNewToken(body)
      .pipe(
        catchError(err => of(false)),
        map(res => {
          if (typeof res !== 'boolean') {
            this._authInfo = res;
            localStorage.setItem('token', JSON.stringify(res));
          } else {
            this._authInfo = undefined;
            localStorage.removeItem('token');
          }
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

  private _getNewToken(body: { username: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(URLS.NEW_TOKEN, this.formatService.getFormDataFromObject(body));
  }
}
