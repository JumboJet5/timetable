import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  constructor(private http: HttpClient) { }

  public getSpecialties(params: IRequestParams): Observable<IPageable<ISpecialty>> {
    return this.http.get<IPageable<any>>(URLS.SPECIALTIES, {params: params as {}});
  }

  public getSpecialty(id: number): Observable<ISpecialty> {
    return this.http.get<any>(URLS.SPECIALTY(id));
  }
}
