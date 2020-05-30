import { Component } from '@angular/core';
import { HousingEntityService } from '@app/service/housing-entity/housing-entity.service';
import { HousingService } from '@app/service/housing/housing.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Component({
  selector: 'app-smart-housing-entity',
  templateUrl: './smart-housing-entity.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/loader.scss',
    './smart-housing-entity.component.scss',
  ],
  providers: [HousingEntityService],
})
export class SmartHousingEntityComponent extends SmartItemEntity<IHousing> {
  constructor(protected _housingService: HousingService,
              public housingEntityService: HousingEntityService) {
    super(_housingService, housingEntityService);
  }
}
