import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EntityFormService } from '@app/shared/classes/entity-form.service';
import { IStudyPeriodRange } from 'src/core/interfaces/range.interface';


@Injectable()
export class EntityWithRangeFormService<TItem extends IStudyPeriodRange> extends EntityFormService<TItem> {
  public startControl: FormControl = new FormControl('', Validators.required);
  public endControl: FormControl = new FormControl('', Validators.required);
}
