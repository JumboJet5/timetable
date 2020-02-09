import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormatService } from 'src/app/service/format/format.service';
import { ICreateLessonBody } from 'src/core/interfaces/create-lesson-body.interface';
import * as URLS from 'src/core/urls';
import { ITimetable } from 'src/core/interfaces/timetable.interface';

@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient,
              private formatService: FormatService) {}

  public getTimetable(group: string): Observable<ITimetable> {
    return this.http.get<ITimetable>(URLS.TIMETABLE, {params: {group}});
  }

  public getGroupSemester(group: number, semester: number): Observable<any> {
    return this.http.get<any>(URLS.GROUPSEMESTER, {params: {group, semester} as {}});
  }

  public createLesson(body: ICreateLessonBody): Observable<any> {
    return this.http.post<any>(URLS.LESSONS, this.formatService.getFormDataFromObject(body));
  }

  public updateLesson(body: ICreateLessonBody, id: number): Observable<any> {
    return this.http.put<any>(URLS.LESSON(id), this.formatService.getFormDataFromObject(body));
  }

  public deleteLesson(id: number): Observable<any> {
    return this.http.delete<any>(URLS.LESSON(id));
  }
}
