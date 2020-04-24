import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { Observable } from 'rxjs';
import { IPageable, IRequestParams, IUniversity } from '@interfaces';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class UniversityService {
  constructor(private http: HttpClient,
              private formatService: FormatService) { }

  public getUniversities(params: IRequestParams): Observable<IPageable<IUniversity>> {
    return this.http.get<IPageable<IUniversity>>(URLS.UNIVERSITIES, {params: params as {}});
  }

  public getUniversity(id: number): Observable<IUniversity> {
    return this.http.get<IUniversity>(URLS.UNIVERSITY(id));
  }

  public createUniversity(university: IUniversity): Observable<IUniversity> {
    return this.http.post<IUniversity>(URLS.UNIVERSITIES, this.formatService.getFormDataFromObject(university));
  }

  public updateUniversity(id: number, university: IUniversity): Observable<IUniversity> {
    const body = this.formatService.getFormDataFromObject(university);
    if (typeof university.img === 'string') body.delete('img');
    return this.http.put<IUniversity>(URLS.UNIVERSITY(id), body);
  }

  public deleteUniversity(id: number): Observable<null> {
    return this.http.delete<null>(URLS.UNIVERSITY(id));
  }
}
