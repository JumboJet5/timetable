import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as URLS from 'src/core/urls';

@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient) {}

  public getTimetable(slug: string): Observable<TimetableInterface> {
    return this.http.get<TimetableInterface>(URLS.GET_TIMETABLE_LIST(slug));
  }

  public getGroups(params: GroupsRequestParamInterface): Observable<GroupsResponseInterface> {
    return this.http.get<GroupsResponseInterface>(URLS.GET_GROUPS(params));
  }

  public getGroup(id: number): Observable<GroupInterface> {
    return this.http.get<GroupInterface>(URLS.GET_GROUP(id));
  }
}
