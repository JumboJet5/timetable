import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { IYear } from 'src/core/interfaces/year.interface';
import { YEAR, YEARS } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class YearService extends EntityCrudService<IYear> {
  protected _itemsURL = YEARS;
  protected _itemURL = YEAR;
}
