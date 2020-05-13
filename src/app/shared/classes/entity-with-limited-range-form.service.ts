import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { FormatService } from '@app/service/format/format.service';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { EntityWithRangeFormService } from '@app/shared/classes/entity-with-range-form.service';
import { switchMap, tap } from 'rxjs/operators';
import { IStudyPeriodRange } from 'src/core/interfaces/range.interface';


@Injectable()
export class EntityWithLimitedRangeFormService<TItem extends IStudyPeriodRange, TLimiter extends IStudyPeriodRange>
  extends EntityWithRangeFormService<TItem> {
  public isAllFiltersReady = false;
  protected limiterControl: FormControl = new FormControl('', Validators.required);
  private limiter: TLimiter;

  constructor(public formatService: FormatService,
              public dateFormatService: DateFormatService,
              public entityCrudService: EntityCrudService<TLimiter>) {
    super(formatService, dateFormatService);

    this.limiterControl.valueChanges
      .pipe(tap(() => this.isAllFiltersReady = false))
      .pipe(switchMap(value => this.entityCrudService.getItem(value)))
      .subscribe(semester => this.limiter = semester);
  }

  public getEnableRangeDates(): { min: Date, max: Date } {
    return this.formatService.getEnableRangeDates(this.limiter);
  }
}
