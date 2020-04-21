import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { Observable } from 'rxjs';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient,
              private formatService: FormatService) {}

  public getCourses(params: IRequestParams): Observable<IPageable<ICourse>> {
    return this.http.get<IPageable<ICourse>>(URLS.COURSES, {params: params as {}});
  }

  public getCourse(id: number): Observable<ICourse> {
    return this.http.get<ICourse>(URLS.COURSE(id));
  }

  public updateCourse(id: number, course: ICourse): Observable<ICourse> {
    return this.http.put<ICourse>(URLS.COURSE(id), this.formatService.getFormDataFromObject(course));
  }

  public deleteCourse(id: number): Observable<null> {
    return this.http.delete<null>(URLS.COURSE(id));
  }
}
