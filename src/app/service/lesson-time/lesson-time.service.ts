import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class LessonTimeService {
  constructor(private http: HttpClient) {}

  public getLessonTimes(params: IRequestParams): Observable<IPageable<ILessonTime>> {
    return this.http.get<IPageable<ILessonTime>>(URLS.LESSON_TIMES, {params: params as {}});
  }

  public getLessonTime(id: number): Observable<ILessonTime> {
    return this.http.get<ILessonTime>(URLS.LESSON_TIME(id));
  }

  public createLessonTime(body: any): Observable<ILessonTime> {
    return this.http.post<ILessonTime>(URLS.LESSON_TIMES, body);
  }

  public deleteLessonTime(id: number): Observable<null> {
    return this.http.delete<null>(URLS.LESSON_TIME(id));
  }
}
