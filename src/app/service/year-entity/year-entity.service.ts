import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { FormatService } from '@app/service/format/format.service';
import { IYear } from 'src/core/interfaces/year.interface';

@Injectable()
export class YearEntityService {
  public univControl: FormControl = new FormControl('', Validators.required);
  public fromControl: FormControl = new FormControl('', Validators.required);
  public toControl: FormControl = new FormControl('', Validators.required);
  public startControl: FormControl = new FormControl('', Validators.required);
  public endControl: FormControl = new FormControl('', Validators.required);
  public form: FormGroup = new FormGroup({
    from: this.fromControl,
    to: this.toControl,
    end: this.endControl,
    start: this.startControl,
    univ: this.univControl,
  });

  constructor(private _formatService: FormatService,
              private _dateFormatService: DateFormatService) {
    this.startControl.valueChanges
      .subscribe(value => this.fromControl.patchValue(_dateFormatService.getDateFromString(value), {emitEvent: false}));
    this.endControl.valueChanges
      .subscribe(value => this.toControl.patchValue(_dateFormatService.getDateFromString(value), {emitEvent: false}));

    this.fromControl.valueChanges
      .subscribe(value => this.startControl.patchValue(_dateFormatService.getDateString(value)));
    this.toControl.valueChanges
      .subscribe(value => this.endControl.patchValue(_dateFormatService.getDateString(value)));
  }

  public resetForm(theme: Partial<IYear>): void {
    this.form.reset(theme);
  }

  public getControlError(controlName: keyof IYear): string {
    return this._formatService.getControlError(this.form, controlName);
  }
}
