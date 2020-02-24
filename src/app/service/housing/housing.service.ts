import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestParams } from '@interfaces';
import { Observable } from 'rxjs';
import * as URLS from '../../../core/urls';

@Injectable({providedIn: 'root'})
export class HousingService {
  constructor(private http: HttpClient) {
  }

  public getHousings(params: IRequestParams): Observable<any> {
    return this.http.get<any>(URLS.HOUSINGS, {params: params as {}});
  }

  public getHousing(id: number): Observable<any> {
    return this.http.get<any>(URLS.HOUSING(id));
  }
}
