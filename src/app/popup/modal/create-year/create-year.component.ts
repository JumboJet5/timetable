import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { YearEntityService } from '@app/service/year-entity/year-entity.service';
import { YearService } from '@app/service/year/year.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IYear } from 'src/core/interfaces/year.interface';

@Component({
  selector: 'app-create-year',
  templateUrl: './create-year.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-year.component.scss'],
  providers: [YearEntityService],
})
export class CreateYearComponent extends CreateEntityModal<IYear> {
  protected _chanelId: number = PopupChanelEnum.CREATE_YEAR;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _yearService: YearService,
              public yearEntityService: YearEntityService) {
    super(_route, _router, _popupService, _yearService, yearEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.yearEntityService.resetForm({univ: +params.univ});
  }
}
