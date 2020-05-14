import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { UniversityService } from '@app/service/universitiy/university.service';
import { UniversityEntityService } from '@app/service/university-entity/university-entity.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IUniversity } from 'src/core/interfaces/university';

@Component({
  selector: 'app-create-university',
  templateUrl: './create-university.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/modal.scss',
    './create-university.component.scss',
  ],
  providers: [UniversityEntityService],
})
export class CreateUniversityComponent extends CreateEntityModal<IUniversity> {
  protected _chanelId: number = PopupChanelEnum.CREATE_UNIVERSITY;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _universityService: UniversityService,
              public universityEntityService: UniversityEntityService) {
    super(_route, _router, _popupService, _universityService, universityEntityService);
  }

  protected _applyParamsChange(params: Params): void {}
}
