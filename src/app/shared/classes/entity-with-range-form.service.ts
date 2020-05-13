import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { FormatService } from '@app/service/format/format.service';
import { EntityFormService } from '@app/shared/classes/entity-form.service';
import { IStudyPeriodRange } from 'src/core/interfaces/range.interface';


@Injectable()
export class EntityWithRangeFormService<TItem extends IStudyPeriodRange> extends EntityFormService<TItem> {
  public fromControl: FormControl = new FormControl('', Validators.required);
  public toControl: FormControl = new FormControl('', Validators.required);
  public startControl: FormControl = new FormControl('', Validators.required);
  public endControl: FormControl = new FormControl('', Validators.required);

  constructor(public formatService: FormatService,
              public dateFormatService: DateFormatService) {
    super(formatService);

    this.startControl.valueChanges
      .subscribe(value => this.fromControl.patchValue(dateFormatService.getDateFromString(value), {emitEvent: false}));
    this.endControl.valueChanges
      .subscribe(value => this.toControl.patchValue(dateFormatService.getDateFromString(value), {emitEvent: false}));

    this.fromControl.valueChanges
      .subscribe(value => this.startControl.patchValue(dateFormatService.getDateString(value)));
    this.toControl.valueChanges
      .subscribe(value => this.endControl.patchValue(dateFormatService.getDateString(value)));
  }
}
