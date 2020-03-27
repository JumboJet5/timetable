import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {
  }

  public getCourses(params: IRequestParams): Observable<IPageable<ICourse>> {
    return this.http.get<IPageable<ICourse>>(URLS.COURSES, {params: params as {}});
  }

  public getCourse(id: number): Observable<ICourse> {
    return this.http.get<ICourse>(URLS.COURSE(id));
  }
}
