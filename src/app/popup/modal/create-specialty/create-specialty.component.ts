import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { SpecialtyEntityService } from '@app/service/specialty-entity/specialty-entity.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { ISpecialty, ISpecialtyEntity } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-create-specialty',
  templateUrl: './create-specialty.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-specialty.component.scss'],
  providers: [SpecialtyEntityService],
})
export class CreateSpecialtyComponent extends CreateEntityModal<ISpecialty, ISpecialtyEntity> {
  protected _chanelId: number = PopupChanelEnum.CREATE_SPECIALTY;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _specialtyService: SpecialtyService,
              public specialtyEntityService: SpecialtyEntityService) {
    super(_route, _router, _popupService, _specialtyService, specialtyEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.specialtyEntityService.resetForm({univ: +params.univ, faculty: +params.faculty});
  }
}
