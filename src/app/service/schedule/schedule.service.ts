import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormatService } from 'src/app/service/format/format.service';
import * as URLS from 'src/core/urls';

@Injectable()
export class ScheduleService {

    constructor(private http: HttpClient,
                private formatService: FormatService) {}

    public getTimetable(slug: string): Observable<ITimetable> {
        return this.http.get<ITimetable>(URLS.GET_TIMETABLE_LIST(slug));
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
        return this.http.get<any>(URLS.GET_TEACHERS(params));
    }

    public getTeacher(id: number): Observable<any> {
        return this.http.get<any>(URLS.GET_TEACHER(id));
    }

    public getGroupSemester(groupId: number, semesterId: number): Observable<any> {
        return this.http.get<any>(URLS.GET_GROUPSEMESTER(groupId, semesterId));
    }

    public createLesson(body: ICreateLessonBody): Observable<any> {
        return this.http.post<any>(URLS.CREATE_LESSON, this.formatService.getFormDataFromObject(body));
    }

    public updateLesson(body: ICreateLessonBody, id: number): Observable<any> {
        return this.http.put<any>(URLS.UPDATE_LESSON(id), this.formatService.getFormDataFromObject(body));
    }

    public deleteLesson(id: number): Observable<any> {
        return this.http.delete<any>(URLS.DELETE_LESSON(id));
    }
}
