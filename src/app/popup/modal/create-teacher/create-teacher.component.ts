import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { TeacherEntityService } from '@app/service/teacher-entity/teacher-entity.service';
import { TeacherService } from '@app/service/teacher/teacher.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { ITeacher } from 'src/core/interfaces/teacher.interface';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-teacher.component.scss'],
  providers: [TeacherEntityService],
})
export class CreateTeacherComponent extends CreateEntityModal<ITeacher> {
  protected _chanelId: number = PopupChanelEnum.CREATE_TEACHER;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _teacherService: TeacherService,
              public teacherEntityService: TeacherEntityService) {
    super(_route, _router, _popupService, _teacherService, teacherEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.teacherEntityService.resetForm({univ: +params.univ});
  }
}
