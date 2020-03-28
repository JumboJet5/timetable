import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageable, IRequestParams } from '@interfaces';
import { ITheme } from 'src/core/interfaces/theme.interface';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class ThemeService {

  constructor(private http: HttpClient) { }

  public getThemes(params: IRequestParams): Observable<IPageable<ITheme>> {
    return this.http.get<IPageable<ITheme>>(URLS.THEMES, {params: params as {}});
  }

  public getTheme(id: number): Observable<ITheme> {
    return this.http.get<ITheme>(URLS.THEME(id));
  }
}
