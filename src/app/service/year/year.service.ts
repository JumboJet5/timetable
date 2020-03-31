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
}
