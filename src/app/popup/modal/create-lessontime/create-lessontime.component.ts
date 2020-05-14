import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { LessontimeEntityService } from '@app/service/lessontime-entity/lessontime-entity.service';
import { PopupService } from '@app/service/modal/popup.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';

@Component({
  selector: 'app-create-lessontime',
  templateUrl: './create-lessontime.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-lessontime.component.scss'],
  providers: [LessontimeEntityService],
})
export class CreateLessontimeComponent extends CreateEntityModal<ILessonTime> {
  protected _chanelId: number = PopupChanelEnum.CREATE_LESSONTIME;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _lessonTimeService: LessonTimeService,
              protected _popupService: PopupService,
              public lessontimeEntityService: LessontimeEntityService) {
    super(_route, _router, _popupService, _lessonTimeService, lessontimeEntityService);
  }

  protected _applyParamsChange(params: Params) {
    this.lessontimeEntityService.resetForm({faculty: +params.faculty});
  }
}
