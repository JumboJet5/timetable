import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseEntityService } from '@app/service/course-entity/course-entity.service';
import { CourseService } from '@app/service/course/course.service';
import { PopupService } from '@app/service/modal/popup.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { ICourse } from 'src/core/interfaces/course.interface';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-course.component.scss'],
  providers: [CourseEntityService],
})
export class CreateCourseComponent extends CreateEntityModal<ICourse> {
  protected _chanelId: number = PopupChanelEnum.CREATE_COURSE;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _courseService: CourseService,
              public courseEntityService: CourseEntityService) {
    super(_route, _router, _popupService, _courseService, courseEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.courseEntityService.resetForm({univ: +params.univ, faculty: +params.faculty, specialty: +params.specialty});
  }
}
