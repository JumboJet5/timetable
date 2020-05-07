import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IControl } from 'src/core/interfaces/control.interface';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor(private http: HttpClient) {}

  public getControls(params: IRequestParams): Observable<IPageable<IControl>> {
    return this.http.get<IPageable<IControl>>(URLS.CONTROLS, {params: params as {}});
  }

  public getControl(id: number): Observable<IControl> {
    return this.http.get<IControl>(URLS.CONTROL(id));
  }

  public createControl(control: IControl): Observable<IControl> {
    return this.http.post<IControl>(URLS.CONTROLS, control);
  }

  public updateControl(id: number, control: IControl): Observable<IControl> {
    return this.http.put<IControl>(URLS.CONTROL(id), control);
  }

  public deleteControl(id: number): Observable<null> {
    return this.http.delete<null>(URLS.CONTROL(id));
  }
}
