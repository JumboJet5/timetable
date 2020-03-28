import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class GroupsemesterService {

  constructor(private http: HttpClient) {}

  public getGroupSemester(group: number, semester: number | string = ''): Observable<IPageable<IGroupsemester>> {
    return this.http.get<IPageable<IGroupsemester>>(URLS.GROUPSEMESTER, {params: {group, semester} as {}});
  }
}
