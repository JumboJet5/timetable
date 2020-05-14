import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { PeriodEntityService } from '@app/service/period-entity/period-entity.service';
import { PeriodService } from '@app/service/period/period.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IPeriod } from 'src/core/interfaces/period.interface';

@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-period.component.scss'],
  providers: [PeriodEntityService],
})
export class CreatePeriodComponent extends CreateEntityModal<IPeriod> {
  protected _chanelId: number = PopupChanelEnum.CREATE_PERIOD;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _periodService: PeriodService,
              public periodEntityService: PeriodEntityService) {
    super(_route, _router, _popupService,  _periodService, periodEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.periodEntityService.resetForm({semester: +params.semester});
  }
}
