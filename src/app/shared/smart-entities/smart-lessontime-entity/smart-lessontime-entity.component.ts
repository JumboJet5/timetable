import { Component } from '@angular/core';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { LessontimeEntityService } from '@app/service/lessontime-entity/lessontime-entity.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';

@Component({
  selector: 'app-smart-lessontime-entity',
  templateUrl: './smart-lessontime-entity.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/loader.scss',
    './smart-lessontime-entity.component.scss',
  ],
  providers: [LessontimeEntityService],
})
export class SmartLessontimeEntityComponent extends SmartItemEntity<ILessonTime> {
  public isLoading = false;

  constructor(protected _lessonTimeService: LessonTimeService,
              public lessontimeEntityService: LessontimeEntityService) {
    super(_lessonTimeService, lessontimeEntityService);
  }
}
