import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as URLS from '../../../core/urls';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IGroup } from 'src/core/interfaces/group.interface';
import { IRequestParams } from 'src/core/interfaces/request-param/request-param.interface';

@Injectable()
export class GroupService {
  constructor(private http: HttpClient) {
  }

  public getGroups(params: IRequestParams): Observable<IPageable<IGroup>> {
    return this.http.get<IPageable<IGroup>>(URLS.GROUPS, {params: params as {}});
  }

  public getGroup(id: number): Observable<IGroup> {
    return this.http.get<IGroup>(URLS.GROUP(id));
  }
}
