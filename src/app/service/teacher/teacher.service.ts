import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { Observable } from 'rxjs';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import { ITeacher } from 'src/core/interfaces/teacher.interface';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class TeacherService {
  constructor(private http: HttpClient,
              private formatService: FormatService) { }

  public getTeachers(params: IRequestParams): Observable<IPageable<ITeacher>> {
    return this.http.get<IPageable<ITeacher>>(URLS.TEACHERS, {params: params as {}});
  }

  public getTeacher(id: number): Observable<ITeacher> {
    return this.http.get<ITeacher>(URLS.TEACHER(id));
  }

  public updateTeacher(id: number, teacher: ITeacher): Observable<ITeacher> {
    const body = this.formatService.getFormDataFromObject(teacher);
    if (typeof teacher.img === 'string') body.delete('img');
    return this.http.patch<ITeacher>(URLS.SPECIALTY(id), body);
  }

  public createTeacher(body): Observable<ITeacher> {
    return this.http.post<ITeacher>(URLS.SPECIALTIES, this.formatService.getFormDataFromObject(body));
  }

  public deleteTeacher(id: number): Observable<null> {
    return this.http.delete<null>(URLS.TEACHER(id));
  }
}
