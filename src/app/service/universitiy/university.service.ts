import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageable, IRequestParams, IUniversity } from '@interfaces';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class UniversityService {
  constructor(private http: HttpClient) { }

  public getUniversities(params: IRequestParams): Observable<IPageable<IUniversity>> {
    return this.http.get<IPageable<IUniversity>>(URLS.UNIVERSITIES, {params: params as {}});
  }

  public getUniversity(id: number): Observable<IUniversity> {
    return this.http.get<IUniversity>(URLS.UNIVERSITY(id));
  }
}
