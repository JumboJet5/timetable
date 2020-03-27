import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  constructor(private http: HttpClient) { }

  public getFaculties(params: IRequestParams): Observable<IPageable<IFaculty>> {
    return this.http.get<IPageable<IFaculty>>(URLS.FACULTIES, {params: params as {}});
  }

  public getFaculty(id: number): Observable<IFaculty> {
    return this.http.get<IFaculty>(URLS.FACULTY(id));
  }
}
