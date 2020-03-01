import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  constructor(private http: HttpClient) { }

  public getFaculties(params: IRequestParams): Observable<IPageable<any>> {
    return this.http.get<IPageable<any>>(URLS.FACULTIES, {params: params as {}});
  }

  public getFaculty(id: number): Observable<any> {
    return this.http.get<any>(URLS.FACULTY(id));
  }
}
