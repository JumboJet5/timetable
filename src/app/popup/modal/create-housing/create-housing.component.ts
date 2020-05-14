import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HousingEntityService } from '@app/service/housing-entity/housing-entity.service';
import { HousingService } from '@app/service/housing/housing.service';
import { PopupService } from '@app/service/modal/popup.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Component({
  selector: 'app-create-housing',
  templateUrl: './create-housing.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-housing.component.scss'],
  providers: [HousingEntityService],
})
export class CreateHousingComponent extends CreateEntityModal<IHousing> {
  protected _chanelId: number = PopupChanelEnum.CREATE_HOUSING;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _housingService: HousingService,
              public housingEntityService: HousingEntityService) {
    super(_route, _router, _popupService, _housingService, housingEntityService);
  }

  protected _applyParamsChange(params: Params) {
    this.housingEntityService.resetForm({univ: +params.univ});
  }
}
