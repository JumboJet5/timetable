import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IWithId } from 'src/core/interfaces/select-option.interface';
import * as URLS from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class GroupsemesterService {

  constructor(private http: HttpClient) {}

  public getGroupsemester(group: number, semester: number | string = ''): Observable<IPageable<IGroupsemester>> {
    return this.http.get<IPageable<IGroupsemester>>(URLS.GROUPSEMESTERS, {params: {group, semester} as {}});
  }

  public updateGroupsemester(data: IWithId): Observable<IGroupsemester> {
    const body = new FormData();
    body.append('semester', data.semester);
    body.append('group', data.group);
    data.themes.map(theme => body.append('themes', theme.id));
    return this.http.put<IGroupsemester>(URLS.GROUPSEMESTER(data.id), body);
  }

  public createGroupsemester(body: { group: number, semester: number, show_lessons_number: boolean }) {
    return this.http.post(URLS.GROUPSEMESTERS, body);
  }

  public deleteGroupSemester(id: number): Observable<null> {
    return this.http.delete<null>(URLS.GROUPSEMESTER(id));
  }
}
