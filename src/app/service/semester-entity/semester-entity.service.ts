import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { YearService } from '@app/service/year/year.service';
import { EntityWithLimitedRangeFormService } from '@app/shared/classes/entity-with-limited-range-form.service';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { IYear } from 'src/core/interfaces/year.interface';

@Injectable()
export class SemesterEntityService extends EntityWithLimitedRangeFormService<ISemester, IYear> {
  public form: FormGroup = new FormGroup({
    num: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    year: this.limiterControl,
    end: this.endControl,
    start: this.startControl,
  });

  constructor(public formatService: FormatService,
              public yearService: YearService) {
    super(formatService, yearService);
  }
}
