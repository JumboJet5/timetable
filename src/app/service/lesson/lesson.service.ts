import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { Observable } from 'rxjs';
import { ICreateLessonBody } from 'src/core/interfaces/create-lesson-body.interface';
import * as URLS from 'src/core/urls';
import { ILesson } from 'src/core/interfaces/lesson.interface';

@Injectable({providedIn: 'root'})
export class LessonService {

  constructor(private http: HttpClient,
              private formatService: FormatService) {}

  public getLesson(id: number): Observable<ILesson> {
    return this.http.get<ILesson>(URLS.LESSON(id));
  }

  public createLesson(body: ICreateLessonBody): Observable<any> {
    return this.http.post<any>(URLS.LESSONS, this.formatService.getFormDataFromObject(body));
  }

  public updateLesson(body: ICreateLessonBody, id: number): Observable<any> {
    return this.http.put<any>(URLS.LESSON(id), this.formatService.getFormDataFromObject(body));
  }
}
