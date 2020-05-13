import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateInfoGroupsemester, IGroupsemester, IGroupsemesterSimplified } from 'src/core/interfaces/groupsemester.interface';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class GroupsemesterService {

  constructor(private http: HttpClient) {}

  public getGroupsemesters(group: number, semester: number | string = ''): Observable<IPageable<IGroupsemester>> {
    return this.http.get<IPageable<IGroupsemester>>(URLS.GROUPSEMESTERS, {params: {group, semester} as {}});
  }

  public getGroupsemester(id: number): Observable<IGroupsemester> {
    return this.http.get<IGroupsemester>(URLS.GROUPSEMESTER(id));
  }

  public updateGroupsemester(groupsemester: IGroupsemester): Observable<IGroupsemesterSimplified> {
    const themes = groupsemester.themes.map(theme => theme.id);
    const lessons_time = groupsemester.lessons_time.map(time => time.id);
    const body: IGroupsemesterSimplified = {...groupsemester, themes, lessons_time};
    return this.http.put<IGroupsemesterSimplified>(URLS.GROUPSEMESTER(body.id), body);
  }

  public createGroupsemester(body: ICreateInfoGroupsemester): Observable<IGroupsemester> {
    return this.http.post<IGroupsemester>(URLS.GROUPSEMESTERS, body);
  }

  public deleteGroupSemester(id: number): Observable<null> {
    return this.http.delete<null>(URLS.GROUPSEMESTER(id));
  }
}
