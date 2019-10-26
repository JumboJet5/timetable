import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class LessonService {

  constructor(private http: HttpClient) {}

  public getLesson(id: number): Observable<LessonInterface> {
    return this.http.get<LessonInterface>(URLS.GET_LESSON(id));
  }
}
