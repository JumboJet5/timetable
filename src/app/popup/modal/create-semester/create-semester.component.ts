import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { SemesterEntityService } from '@app/service/semester-entity/semester-entity.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { ISemester } from 'src/core/interfaces/semester.interface';

@Component({
  selector: 'app-create-semester',
  templateUrl: './create-semester.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-semester.component.scss'],
  providers: [SemesterEntityService],
})
export class CreateSemesterComponent extends CreateEntityModal<ISemester> {
  public univId: number;
  protected _chanelId: number = PopupChanelEnum.CREATE_SEMESTER;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _semesterService: SemesterService,
              public semesterEntityService: SemesterEntityService) {
    super(_route, _router, _popupService, _semesterService, semesterEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.semesterEntityService.resetForm({year: +params.year});
    if (params.univ) this.univId = +params.univ;
  }
}
