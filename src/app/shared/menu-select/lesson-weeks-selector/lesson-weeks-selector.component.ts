import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatCheckbox } from "@angular/material/checkbox";
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

  public changeWeekStatus(week: VacantWeekInfoInterface, checkbox: MatCheckbox) {
    week.isUsed = !week.isUsed;
    this._setVacantWeekControl();
    setTimeout(() => checkbox.checked = week.isUsed);
  }

  public selectAll(like: boolean) { // todo don't forgot change after customize week vacant filter
    if (this.vacantWeeks) {
      this.vacantWeeks.forEach(week => !week.isHidden && week.isVacant && (week.isUsed = like));
      this._setVacantWeekControl();
    }
  }

  public selectAllOdd(like: boolean) { // todo don't forgot change after customize week vacant filter
    if (this.vacantWeeks) {
      this.vacantWeeks.forEach((week, i) => !week.isHidden && week.isVacant && (week.isUsed = (i % 2 === 0) === like));
      this._setVacantWeekControl();
    }
  }

  private _getWeeksString(): string {
    return this.vacantWeeks.map(week => week && week.isUsed ? 1 : 0).join('');
  }

  private _initVacantWeeksList() {
    if (!!this.weekSchedule && (!!this.day || this.day === 0) && (!!this.lesson_time || this.lesson_time === 0)) {
      this.vacantWeeks = this.weekSchedule.getVacantWeeks(this.lesson, this.day, this.lesson_time);
      this.vacantWeeks.forEach(week => week.isUsed = week.isUsed && week.isVacant && !week.isHidden);
      this._setVacantWeekControl();
    }
  }

  private _setVacantWeekControl() {
    if (this.selectControl) this.selectControl.patchValue(this._getWeeksString());
  }
}
