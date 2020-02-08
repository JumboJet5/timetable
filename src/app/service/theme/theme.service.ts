import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestParams } from '@interfaces';
import * as URLS from 'src/core/urls';

@Injectable()
export class ThemeService {

  constructor(private http: HttpClient) { }

  public getThemes(params: IRequestParams): Observable<any> {
    return this.http.get<any>(URLS.THEMES, {params: params as {}});
  }

  public getTheme(id: number): Observable<any> {
    return this.http.get<any>(URLS.THEME(id));
  }
}
