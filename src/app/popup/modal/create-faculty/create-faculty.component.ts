import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FacultyEntityService } from '@app/service/faculty-entity/faculty-entity.service';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { PopupService } from '@app/service/modal/popup.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-faculty.component.scss'],
  providers: [FacultyEntityService],
})
export class CreateFacultyComponent extends CreateEntityModal<IFaculty> {
  protected _chanelId: number = PopupChanelEnum.CREATE_FACULTY;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _facultyService: FacultyService,
              public facultyEntityService: FacultyEntityService) {
    super(_route, _router, _popupService, _facultyService, facultyEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.facultyEntityService.resetForm({univ: +params.univ});
  }
}
