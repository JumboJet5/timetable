import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeekSchedule } from '@classes/week-schedule';
import { ITimetable } from '@interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class ScheduleService {
  private _lastTimeTableGroupSlug: string = undefined;
  private _actualSchedule: BehaviorSubject<WeekSchedule> = new BehaviorSubject<WeekSchedule>(undefined);

  constructor(private http: HttpClient) {}

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

  public deleteLesson(id: number): Observable<any> {
    return this.http.delete<any>(URLS.LESSON(id));
  }
}
