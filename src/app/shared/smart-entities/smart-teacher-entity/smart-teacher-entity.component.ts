import { Component } from '@angular/core';
import { TeacherEntityService } from '@app/service/teacher-entity/teacher-entity.service';
import { TeacherService } from '@app/service/teacher/teacher.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { ITeacher } from 'src/core/interfaces/teacher.interface';

@Component({
  selector: 'app-smart-teacher-entity',
  templateUrl: './smart-teacher-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-teacher-entity.component.scss'],
  providers: [TeacherEntityService],
})
export class SmartTeacherEntityComponent extends SmartItemEntity<ITeacher> {
  constructor(protected _teacherService: TeacherService,
              public teacherEntityService: TeacherEntityService) {
    super(_teacherService, teacherEntityService);
  }
}
