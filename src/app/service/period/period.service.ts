import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { IPeriod } from 'src/core/interfaces/period.interface';
import { PERIOD, PERIODS } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class PeriodService extends EntityCrudService<IPeriod> {
  protected _itemsURL = PERIODS;
  protected _itemURL = PERIOD;

  constructor(protected http: HttpClient) {
    super(http);
  }
}
