import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class SemesterService {
  constructor(private http: HttpClient) {}

  public getSemesters(params: IRequestParams): Observable<IPageable<ISemester>> {
    return this.http.get<IPageable<ISemester>>(URLS.SEMESTERS, {params: params as {}});
  }

  public getSemester(id: number): Observable<ISemester> {
    return this.http.get<ISemester>(URLS.SEMESTER(id));
  }

  public createSemester(body: ISemester): Observable<ISemester> {
    return this.http.post<ISemester>(URLS.SEMESTERS, body);
  }

  public updateSemester(id: number, semester: ISemester): Observable<ISemester> {
    return this.http.put<ISemester>(URLS.SEMESTER(id), semester);
  }
}
