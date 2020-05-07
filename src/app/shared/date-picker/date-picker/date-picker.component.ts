import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    './date-picker.component.scss',
  ],
  // animations: [
  //   growthTransitionAnimation,
  // ],
})
export class DatePickerComponent implements OnInit {
  @Input() public isDisabled: boolean;
  @Input() public position: 'left' | 'right' = 'left';
  @Input() public min: Date;
  @Input() public max: Date;
  @Input() public placeholder: string;
  public currentMonth: Date;
  public currentDays: Date[];
  public weekDays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private dateFormatService: DateFormatService) {
  }

  private _isOpened = false;

  public get isOpened(): boolean {
    return this._isOpened;
  }

  public set isOpened(value: boolean) {
    this._isOpened = value;
    this.setMonth(this.dateControl ? this.dateControl.value || new Date() : new Date());
  }

  private _dateControl: AbstractControl;

  public get dateControl(): AbstractControl {
    return this._dateControl;
  }

  @Input()
  public set dateControl(value: AbstractControl) {
    this._unsubscribe.next();
    this._dateControl = value;
    this.setMonth(value.value);
    value.patchValue(this.dateFormatService.unificationDate(value.value));
    value.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((date: Date) => this.setMonth(date));
  }

  public ngOnInit(): void {
    if (!this.currentMonth) this.setMonth(new Date());
  }

  public nextMonth(increment: number = 1): void {
    this.setMonth(new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + increment, 1));
  }

  public isSelected(day: Date): boolean {
    return !!day && this.dateControl.value instanceof Date && this.dateControl.value.getTime() === day.getTime();
  }

  public isUnactivated(day: Date): boolean {
    return !day || (this.min instanceof Date && this.min.getTime() > day.getTime())
      || (this.max instanceof Date && this.max.getTime() < day.getTime());
  }

  public isNextMonthEnable(): boolean {
    if (!this.currentMonth || !(this.max instanceof Date)) return true;
    const isValidYear = this.max.getFullYear() > this.currentMonth.getFullYear();
    const isValidMonth = (this.max.getFullYear() === this.currentMonth.getFullYear() && this.max.getMonth() > this.currentMonth.getMonth());
    return isValidYear || isValidMonth;
  }

  public isPreviousMonthEnable(): boolean {
    if (!this.currentMonth || !(this.min instanceof Date)) return true;
    const isValidYear = this.min.getFullYear() < this.currentMonth.getFullYear();
    const isValidMonth = (this.min.getFullYear() === this.currentMonth.getFullYear() && this.min.getMonth() < this.currentMonth.getMonth());
    return isValidYear || isValidMonth;
  }

  public isToday(day: Date): boolean {
    return !!day && this.dateFormatService.unificationDate(new Date()).getTime() === day.getTime();
  }

  public chooseDay(day: Date): void {
    this.dateControl.patchValue(day);
    this.dateControl.markAsDirty();
    this.isOpened = false;
  }

  private setMonth(date: Date): void {
    if (date instanceof Date && (!this.currentMonth || date.getMonth() !== this.currentMonth.getMonth())) {
      this.currentMonth = date;
      this.currentDays = [...this.dateFormatService.getPrevDaysArray(date),
        ...this.dateFormatService.getDaysArray(date), ...this.dateFormatService.getNextDaysArray(date)];
    }
  }
}
