import { Component, Optional } from '@angular/core';
import { HousingService } from '@app/service/housing/housing.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Component({
  selector: 'app-housings-list',
  templateUrl: './housings-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './housings-list.component.scss'],
})
export class HousingsListComponent extends ItemsListComponent<IHousing> {
  public emptyListMessage = 'Список корпусів пустий';

  constructor(private _housingService: HousingService,
              protected _popupService: PopupService,
              @Optional() public smartDetailsService: SmartDetailsService) {
    super(itemServiceFactory<IHousing>(params => this._housingService.getItems(params),
      id => this._housingService.deleteItem(id)), _popupService, smartDetailsService);
  }

  public getItemDetailsEntity(entity: IHousing): void {
    if (!!this.smartDetailsService) this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.HOUSING};
  }
}
