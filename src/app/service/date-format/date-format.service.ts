import { Injectable } from '@angular/core';

@Injectable({
  providedIn: null,
})
export class DateFormatService {
  public getDaysArray(date: Date): Date[] {
    const monthLength = this.getLastDayOfMonth(date).getDate();
    return this.getNumberArrayFromTo(1, monthLength)
      .map(day => new Date(date.getFullYear(), date.getMonth(), day));
  }

  public getPrevDaysArray(date: Date): Date[] {
    const prevLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
    return this.getNumberArrayFromTo(prevLastDate.getDate() + 1 - prevLastDate.getDay(), prevLastDate.getDay())
      .map(day => new Date(date.getFullYear(), date.getMonth() - 1, day));
  }

  public getNextDaysArray(date: Date): Date[] {
    const restLength = (7 - this.getLastDayOfMonth(date).getDay()) % 7;
    return this.getNumberArrayFromTo(1, restLength)
      .map(day => new Date(date.getFullYear(), date.getMonth() + 1, day));
  }

  public unificationDate(date: Date): Date {
    return date instanceof Date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : date;
  }

  public getDateFromString(date: string): Date {
    return !!date && /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date) ? this.unificationDate(new Date(date)) : null;
  }

  public getDateString(date: Date): string {
    if (!date) return '';

    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`;
  }

  public getLastDayOfMonth(month: Date): Date {
    return new Date(month.getFullYear(), month.getMonth() + 1, 0);
  }

  private getNumberArrayFromTo(from: number, length: number): number[] {
    return length > 0 ? new Array(length).fill(0).map((_, i) => from + i) : [];
  }
}
