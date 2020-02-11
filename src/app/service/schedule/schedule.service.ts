import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeekSchedule } from '@classes/week-schedule';
import { ICreateLessonBody, ITimetable } from '@interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormatService } from 'src/app/service/format/format.service';
import * as URLS from 'src/core/urls';

@Injectable()
export class ScheduleService {
  private _lastTimeTableGroupSlug: string = undefined;
  private _actualSchedule: BehaviorSubject<WeekSchedule> = new BehaviorSubject<WeekSchedule>(undefined);

  constructor(private http: HttpClient,
              private formatService: FormatService) {}

  public getTimetable(group: string, isForce: boolean = false): void {
    if (!this._lastTimeTableGroupSlug || this._lastTimeTableGroupSlug !== group || isForce) {
      this._lastTimeTableGroupSlug = group;
      this.http.get<ITimetable>(URLS.TIMETABLE, {params: {group}})
        .subscribe(res => this._actualSchedule.next(new WeekSchedule(res)), () => this._actualSchedule.next(undefined));
    }
  }

  public getActualSchedule$(): Observable<WeekSchedule> {
    return this._actualSchedule.asObservable();
  }

  public getGroupSemester(group: number, semester: number): Observable<any> {
    return this.http.get<any>(URLS.GROUPSEMESTER, {params: {group, semester} as {}});
  }

  public createLesson(body: ICreateLessonBody): Observable<any> {
    return this.http.post<any>(URLS.LESSONS, this.formatService.getFormDataFromObject(body));
  }

  public updateLesson(body: ICreateLessonBody, id: number): Observable<any> {
    return this.http.put<any>(URLS.LESSON(id), this.formatService.getFormDataFromObject(body));
  }

  public deleteLesson(id: number): Observable<any> {
    return this.http.delete<any>(URLS.LESSON(id));
  }
}
