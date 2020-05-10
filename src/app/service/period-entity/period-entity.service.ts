import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { FormatService } from '@app/service/format/format.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { switchMap, tap } from 'rxjs/operators';
import { IPeriod } from 'src/core/interfaces/period.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';

@Injectable()
export class PeriodEntityService {
  public semester: ISemester;
  public kindControl: FormControl = new FormControl('', Validators.required);
  public semesterControl: FormControl = new FormControl('', Validators.required);
  public fromControl: FormControl = new FormControl('', Validators.required);
  public toControl: FormControl = new FormControl('', Validators.required);
  public startControl: FormControl = new FormControl('', Validators.required);
  public endControl: FormControl = new FormControl('', Validators.required);
  public form: FormGroup = new FormGroup({
    semester: this.semesterControl,
    kind: this.kindControl,
    from: this.fromControl,
    to: this.toControl,
    end: this.endControl,
    start: this.startControl,
  });
  private isAllFiltersReady = false;

  constructor(private _formatService: FormatService,
              private _semesterService: SemesterService,
              private _dateFormatService: DateFormatService) {
    this.fromControl.valueChanges
      .subscribe(value => this.startControl.patchValue(_dateFormatService.getDateString(value)));
    this.toControl.valueChanges
      .subscribe(value => this.endControl.patchValue(_dateFormatService.getDateString(value)));

    this.startControl.valueChanges
      .subscribe(value => this.fromControl.patchValue(_dateFormatService.getDateFromString(value), {emitEvent: false}));
    this.endControl.valueChanges
      .subscribe(value => this.toControl.patchValue(_dateFormatService.getDateFromString(value), {emitEvent: false}));

    this.semesterControl.valueChanges
      .pipe(tap(() => this.isAllFiltersReady = false))
      .pipe(switchMap(value => this._semesterService.getSemester(value)))
      .subscribe(semester => this.semester = semester);
  }

  public resetForm(theme: Partial<IPeriod>): void {
    this.form.reset(theme);
  }

  public getEnableRangeDates(): { min: Date, max: Date } {
    const min = !!this.semester ? new Date(this.semester.start) : undefined;
    const max = !!this.semester ? new Date(this.semester.end) : undefined;
    return {min, max};
  }

  public getControlError(controlName: keyof IPeriod): string {
    return this._formatService.getControlError(this.form, controlName);
  }
}
