import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { ISemester } from 'src/core/interfaces/semester.interface';

@Injectable()
export class SemesterEntityService {
  public form: FormGroup = new FormGroup({
    num: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    year: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    from: new FormControl(''),
    to: new FormControl(''),
  });

  constructor(public dateFormatService: DateFormatService) {
    this.form.get('from').valueChanges
      .subscribe(value => this.form.get('start').patchValue(dateFormatService.getDateString(value)));
    this.form.get('to').valueChanges
      .subscribe(value => this.form.get('end').patchValue(dateFormatService.getDateString(value)));
  }

  public resetForm(housing: Partial<ISemester>): void {
    this.form.patchValue({
      ...housing,
      from: this.dateFormatService.getDateFromString(housing.start),
      to: this.dateFormatService.getDateFromString(housing.end),
    });
    if (housing.year) this.form.get('year').disable({onlySelf: true});
  }

  public getFormValue(): ISemester {
    this.form.get('year').enable();
    const result = this.form.value;
    if (this.form.value.year) this.form.get('year').disable({onlySelf: true});
    return result;
  }
}
