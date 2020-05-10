import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IPeriod } from 'src/core/interfaces/period.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class PeriodService {

  constructor(private http: HttpClient) { }

  public getPeriods(params: IRequestParams): Observable<IPageable<IPeriod>> {
    return this.http.get<IPageable<IPeriod>>(URLS.PERIODS, {params: params as {}});
  }

  public getPeriod(id: number): Observable<IPeriod> {
    return this.http.get<IPeriod>(URLS.PERIOD(id));
  }

  public createPeriod(period: IPeriod): Observable<IPeriod> {
    return this.http.post<IPeriod>(URLS.PERIODS, period);
  }

  public updatePeriod(id: number, period: IPeriod): Observable<IPeriod> {
    return this.http.put<IPeriod>(URLS.PERIOD(id), period);
  }

  public deletePeriod(id: number): Observable<null> {
    return this.http.delete<null>(URLS.PERIOD(id));
  }
}
