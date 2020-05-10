import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import { IYear } from 'src/core/interfaces/year.interface';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class YearService {
  constructor(private http: HttpClient) { }

  public getYears(params: IRequestParams): Observable<IPageable<IYear>> {
    return this.http.get<IPageable<IYear>>(URLS.YEARS, {params: params as {}});
  }

  public getYear(id: number): Observable<IYear> {
    return this.http.get<IYear>(URLS.YEAR(id));
  }

  public createYear(year: IYear): Observable<IYear> {
    return this.http.post<IYear>(URLS.YEARS, year);
  }

  public updateYear(id: number, year: IYear): Observable<IYear> {
    return this.http.put<IYear>(URLS.YEAR(id), year);
  }

  public deleteYear(id: number): Observable<null> {
    return this.http.delete<null>(URLS.YEAR(id));
  }
}
