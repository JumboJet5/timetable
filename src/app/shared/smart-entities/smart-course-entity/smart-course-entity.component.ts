import { Component } from '@angular/core';
import { CourseEntityService } from '@app/service/course-entity/course-entity.service';
import { CourseService } from '@app/service/course/course.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { ICourse, ICourseEntity } from 'src/core/interfaces/course.interface';

@Component({
  selector: 'app-smart-course-entity',
  templateUrl: './smart-course-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-course-entity.component.scss'],
  providers: [CourseEntityService],
})
export class SmartCourseEntityComponent extends SmartItemEntity<ICourse, ICourseEntity> {
  constructor(protected _courseService: CourseService,
              public courseEntityService: CourseEntityService) {
    super(_courseService, courseEntityService);
  }
}
