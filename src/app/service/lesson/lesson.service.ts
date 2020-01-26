import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class LessonService {

  constructor(private http: HttpClient) {}

  public getLesson(id: number): Observable<ILesson> {
    return this.http.get<ILesson>(URLS.GET_LESSON(id));
  }
}
