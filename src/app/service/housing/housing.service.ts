import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { IHousing } from 'src/core/interfaces/housing.interface';
import { HOUSING, HOUSINGS } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class HousingService extends EntityCrudService<IHousing> {
  protected _itemsURL = HOUSINGS;
  protected _itemURL = HOUSING;
}
