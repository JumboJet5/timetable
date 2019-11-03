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

  public getThemes(params: ThemesRequestParamInterface): Observable<any> {
    return this.http.get<any>(URLS.GET_THEMES(params));
  }

  public getTheme(id: number): Observable<any> {
    return this.http.get<any>(URLS.GET_THEME(id));
  }

  public getHousings(params: HousingsRequestParamInterface): Observable<any> {
    return this.http.get<any>(URLS.GET_HOUSINGS(params));
  }

  public getHousing(id: number): Observable<any> {
    return this.http.get<any>(URLS.GET_HOUSING(id));
  }

  public getRooms(params: RoomsRequestParamInterface): Observable<any> {
    return this.http.get<any>(URLS.GET_ROOMS(params));
  }

  public getRoom(id: number): Observable<any> {
    return this.http.get<any>(URLS.GET_ROOM(id));
  }

  public getTeachers(params: TeachersRequestParamInterface): Observable<any> {
    console.log(params)
    return this.http.get<any>(URLS.GET_TEACHERS(params));
  }

  public getTeacher(id: number): Observable<any> {
    return this.http.get<any>(URLS.GET_TEACHER(id));
  }
}
