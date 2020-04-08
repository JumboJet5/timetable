import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  constructor(private http: HttpClient,
              private formatService: FormatService) { }

  public getSpecialties(params: IRequestParams): Observable<IPageable<ISpecialty>> {
    return this.http.get<IPageable<any>>(URLS.SPECIALTIES, {params: params as {}});
  }

  public getSpecialty(id: number): Observable<ISpecialty> {
    return this.http.get<any>(URLS.SPECIALTY(id));
  }

  public updateSpecialty(id: number, specialty: ISpecialty): Observable<ISpecialty> {
    return this.http.patch<ISpecialty>(URLS.SPECIALTY(id), specialty);
  }

  public updateLogo(id: number, file: File): Observable<string> {
    const body = new FormData();
    if (file) body.append('img', file, file.name);
    else body.append('img', null);
    return this.http.patch<ISpecialty>(URLS.SPECIALTY(id), body)
      .pipe(map(specialty => specialty.img));
  }

  public createSpecialty(body): Observable<ISpecialty> {
    return this.http.post<ISpecialty>(URLS.SPECIALTIES, this.formatService.getFormDataFromObject(body));
  }

  public deleteSpecialty(id: number): Observable<null> {
    return this.http.delete<null>(URLS.SPECIALTY(id));
  }
}
