import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ControlEntityService } from '@app/service/control-entity/control-entity.service';
import { ControlService } from '@app/service/control/control.service';
import { PopupService } from '@app/service/modal/popup.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IControl } from 'src/core/interfaces/control.interface';

@Component({
  selector: 'app-create-control',
  templateUrl: './create-control.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-control.component.scss'],
  providers: [ControlEntityService],
})
export class CreateControlComponent extends CreateEntityModal<IControl> {
  protected _chanelId: number = PopupChanelEnum.CREATE_CONTROL;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              public controlEntityService: ControlEntityService,
              protected _popupService: PopupService,
              protected _controlService: ControlService) {
    super(_route, _router, _popupService, _controlService, controlEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.controlEntityService.resetForm({group_semester: params.group_semester});
  }
}
