import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { FormatService } from '@app/service/format/format.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { EntityWithLimitedRangeFormService } from '@app/shared/classes/entity-with-limited-range-form.service';
import { IPeriod } from 'src/core/interfaces/period.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';

@Injectable()
export class PeriodEntityService extends EntityWithLimitedRangeFormService<IPeriod, ISemester> {
  public form: FormGroup = new FormGroup({
    semester: this.limiterControl,
    kind: new FormControl('', Validators.required),
    from: this.fromControl,
    to: this.toControl,
    end: this.endControl,
    start: this.startControl,
  });

  constructor(public formatService: FormatService,
              public dateFormatService: DateFormatService,
              public semesterService: SemesterService) {
    super(formatService, dateFormatService, semesterService);
  }
}
