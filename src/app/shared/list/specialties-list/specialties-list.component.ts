import { Component, Optional } from '@angular/core';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialties-list',
  templateUrl: './specialties-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './specialties-list.component.scss'],
})
export class SpecialtiesListComponent extends ItemsListComponent<ISpecialty> {
  public emptyListMessage = 'Список спеціальностей пустий';

  constructor(private _specialtyService: SpecialtyService,
              protected _popupService: PopupService,
              @Optional() public smartDetailsService: SmartDetailsService) {
    super(itemServiceFactory<ISpecialty>(params => this._specialtyService.getItems(params),
      id => this._specialtyService.deleteItem(id)), _popupService, smartDetailsService);
  }

  public getItemDetailsEntity(entity: ISpecialty): void {
    if (!!this.smartDetailsService) this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.SPECIALTY};
  }
}
