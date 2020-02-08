import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestParams } from 'src/core/interfaces/request-param/request-param.interface';
import * as URLS from 'src/core/urls';

@Injectable()
export class TeacherService {
  constructor(private http: HttpClient) { }

  public getTeachers(params: IRequestParams): Observable<any> {
    return this.http.get<any>(URLS.TEACHERS, {params: params as {}});
  }

  public getTeacher(id: number): Observable<any> {
    return this.http.get<any>(URLS.TEACHER(id));
  }
}
