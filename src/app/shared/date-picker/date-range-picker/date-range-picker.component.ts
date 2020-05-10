import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRange } from 'src/core/interfaces/range.interface';


@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  @Input() public isDisabled: boolean;
  @Input() public min: Date;
  @Input() public max: Date;
  @Input() public placeholder: string;
  public currentMonth: IRange = {from: undefined, to: undefined};
  public currentDays: { from: Date[], to: Date[] } = {from: undefined, to: undefined};
  public chosenRange: IRange = {from: undefined, to: undefined};
  public isRangeChanging = false;
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
    if (value) this._setInitialValue(this.dateControl.value || {});
  }

  private _dateControl: AbstractControl;

  public get dateControl(): AbstractControl {
    return this._dateControl;
  }

  @Input()
  public set dateControl(value: AbstractControl) {
    this._unsubscribe.next();
    this._dateControl = value;
    this._setInitialValue(value.value || {} as IRange);
    value.patchValue(this.dateFormatService.unificationDate(value.value));
    value.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((dates: IRange) => this._setInitialValue(dates || {} as IRange));
  }

  public ngOnInit(): void {
    if (!this.currentMonth) this._setInitialValue({} as IRange);
  }

  public nextMonth(increment: number = 1, monthOrderName: 'from' | 'to'): void {
    const prevMonthDate = this.currentMonth[monthOrderName];
    const date = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth() + increment, 1);
    this.setMonth(date, monthOrderName);
  }

  public isUnactivated(day: Date): boolean {
    return !day || (this.min instanceof Date && this.min.getTime() > day.getTime())
      || (this.max instanceof Date && this.max.getTime() < day.getTime());
  }

  public isNextMonthEnable(monthOrderName: 'from' | 'to'): boolean {
    const monthDate = this.currentMonth[monthOrderName];
    const isValidDifference = monthOrderName !== 'from' || (this.currentMonth.to.getMonth() - monthDate.getMonth() > 1)
      || (this.currentMonth.to.getFullYear() - monthDate.getFullYear() > 0);
    if (!this.currentMonth[monthOrderName] || !(this.max instanceof Date) || !isValidDifference) return isValidDifference;
    const isValidYear = this.max.getFullYear() > monthDate.getFullYear();
    const isValidMonth = (this.max.getFullYear() === monthDate.getFullYear() && this.max.getMonth() > monthDate.getMonth());
    return isValidYear || (isValidMonth && isValidDifference);
  }

  public isPreviousMonthEnable(monthOrderName: 'from' | 'to'): boolean {
    const monthDate = this.currentMonth[monthOrderName];
    const isValidDifference = monthOrderName !== 'to' || (monthDate.getMonth() - this.currentMonth.from.getMonth() > 1)
      || (monthDate.getFullYear() - this.currentMonth.from.getFullYear() > 0);
    if (!this.currentMonth[monthOrderName] || !(this.min instanceof Date) || !isValidDifference) return isValidDifference;
    const isValidYear = this.min.getFullYear() < monthDate.getFullYear();
    const isValidMonth = (this.min.getFullYear() === monthDate.getFullYear() && this.min.getMonth() < monthDate.getMonth());
    return isValidYear || (isValidMonth && isValidDifference);
  }

  public isToday(day: Date): boolean {
    return !!day && this.dateFormatService.unificationDate(new Date()).getTime() === day.getTime();
  }

  public chooseDay(day: Date): void {
    this.onEnter(day);
    if (!this.isRangeChanging) {
      this.chosenRange.temp = day;
      this.chosenRange.from = day;
      this.chosenRange.to = day;
      this.isRangeChanging = true;
    } else {
      if (this.chosenRange.temp === this.chosenRange.from) this.chosenRange.to = day;
      else this.chosenRange.from = day;
      this.isRangeChanging = false;
    }
  }

  public onEnter(day: Date): void {
    if (this.isRangeChanging && (this.chosenRange.to.getTime() < this.chosenRange.temp.getTime()
      || this.chosenRange.temp.getTime() < this.chosenRange.from.getTime()))
      [this.chosenRange.from, this.chosenRange.to] = [this.chosenRange.to, this.chosenRange.from];

    if (this.isRangeChanging)
      if (this.chosenRange.temp === this.chosenRange.from) this.chosenRange.to = day;
      else this.chosenRange.from = day;
  }

  public isInRange(day: Date): boolean {
    const {from, to} = this.chosenRange;
    return from && to && day && from.getTime() < day.getTime() && day.getTime() < to.getTime();
  }

  public onReset() {
    this.dateControl.patchValue({from: undefined, to: undefined});
    this.dateControl.markAsDirty();
    this.isOpened = false;
  }

  public onApply() {
    let to = new Date(this.chosenRange.to.getFullYear(), this.chosenRange.to.getMonth(), this.chosenRange.to.getDate() + 1);
    to = new Date(to.getTime() - 1);
    this.dateControl.patchValue({from: this.chosenRange.from, to});
    this.dateControl.markAsDirty();
    this.isOpened = false;
  }

  private setMonth(date: Date, monthOrderName: 'from' | 'to'): void {
    if (date instanceof Date && (!this.currentMonth[monthOrderName]
      || date.getMonth() !== this.currentMonth[monthOrderName].getMonth())) {
      this.currentMonth[monthOrderName] = date;
      this.currentDays[monthOrderName] = [
        ...this.dateFormatService.getPrevDaysArray(date),
        ...this.dateFormatService.getDaysArray(date), ...this.dateFormatService.getNextDaysArray(date),
      ];
    }
  }

  private _setInitialValue(value: IRange): void {
    this.chosenRange.from = value ? value.from : undefined;
    this.chosenRange.to = value && value.to ? new Date(value.to.getFullYear(), value.to.getMonth(), value.to.getDate()) : undefined;
    const now = (!!value && value.from) || new Date();
    this.setMonth(now, 'from');
    const next = new Date(now);
    next.setDate(1);
    next.setMonth(now.getMonth() + 1);
    this.setMonth(value ? value.to || next : next, 'to');
  }
}
