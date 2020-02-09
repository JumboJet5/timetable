import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Lesson } from '@classes/lesson';
import { WeekSchedule } from '@classes/week-schedule';
import { VacantWeekInfoInterface } from '@interfaces';

@Component({
  selector: 'app-lesson-weeks-selector',
  templateUrl: './lesson-weeks-selector.component.html',
  styleUrls: ['./lesson-weeks-selector.component.scss']
})
export class LessonWeeksSelectorComponent implements OnInit, OnChanges {
  @Input() public selectControl: AbstractControl;
  @Input() public weekSchedule: WeekSchedule;
  @Input() public lesson: Lesson;
  @Input() public day: number;
  @Input() public lesson_time: number;
  public vacantWeeks: VacantWeekInfoInterface[];

  public ngOnInit(): void {
    this._initVacantWeeksList();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._initVacantWeeksList();
  }

  public changeWeekStatus(week: VacantWeekInfoInterface) {
    week.isUsed = !week.isUsed;
    this._setVacantWeekControl();
  }

  public selectAll(asValue: boolean) { // todo don't forgot change after customize week vacant filter
    if (this.vacantWeeks) {
      this.vacantWeeks.forEach(week => !week.isHidden && week.isVacant && (week.isUsed = asValue));
      this._setVacantWeekControl();
    }
  }

  public selectAllOdd(asValue: boolean) { // todo don't forgot change after customize week vacant filter
    if (this.vacantWeeks) {
      const firstNotHidden = this.vacantWeeks.findIndex(week => !week.isHidden);
      this.vacantWeeks.forEach((week, i) => i >= firstNotHidden && !week.isHidden && week.isVacant
        && (week.isUsed = ((i - firstNotHidden) % 2 === 0) === asValue));
      this._setVacantWeekControl();
    }
  }

  private _getWeeksString(): string {
    return this.vacantWeeks.map((week, i) => week && week.isUsed ? 1 : 0).join('');
  }

  private _initVacantWeeksList() {
    if (!!this.weekSchedule && this.lesson && this.day && this.lesson_time) {
      this.vacantWeeks = this.weekSchedule.getVacantWeeks(this.lesson, this.day, this.lesson_time);
      this.vacantWeeks.forEach(week => week.isUsed = week.isUsed && week.isVacant);
      this._setVacantWeekControl();
    }
  }

  private _setVacantWeekControl() {
    if (this.selectControl) this.selectControl.patchValue(this._getWeeksString());
  }
}
