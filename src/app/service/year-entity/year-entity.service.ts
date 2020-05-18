import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityWithRangeFormService } from '@app/shared/classes/entity-with-range-form.service';
import { IYear } from 'src/core/interfaces/year.interface';


@Injectable()
export class YearEntityService extends EntityWithRangeFormService<IYear> {
  public form: FormGroup = new FormGroup({
    end: this.endControl,
    start: this.startControl,
    univ: new FormControl('', Validators.required),
  });
}
