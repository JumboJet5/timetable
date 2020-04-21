import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPageable, IRequestParams } from '@interfaces';
import { Observable } from 'rxjs';
import { IHousing } from 'src/core/interfaces/housing.interface';
import * as URLS from '../../../core/urls';

@Injectable({providedIn: 'root'})
export class HousingService {
  constructor(private http: HttpClient) {
  }

  public getHousings(params: IRequestParams): Observable<IPageable<IHousing>> {
    return this.http.get<IPageable<IHousing>>(URLS.HOUSINGS, {params: params as {}});
  }

  public getHousing(id: number): Observable<IHousing> {
    return this.http.get<IHousing>(URLS.HOUSING(id));
  }

  public createHousing(housing: IHousing): Observable<IHousing> {
    return this.http.post<IHousing>(URLS.HOUSINGS, housing);
  }
}
