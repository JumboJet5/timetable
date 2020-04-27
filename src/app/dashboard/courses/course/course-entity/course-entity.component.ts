import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseEntityService } from '@app/service/course-entity/course-entity.service';
import { ICourse } from 'src/core/interfaces/course.interface';

@Component({
  selector: 'app-course-entity',
  templateUrl: './course-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './course-entity.component.scss'],
  providers: [CourseEntityService],
})
export class CourseEntityComponent {
  @Output() public save: EventEmitter<ICourse> = new EventEmitter<ICourse>();

  constructor(public courseEntityService: CourseEntityService) { }

  private _course: ICourse;

  public get course(): ICourse {
    return this._course;
  }

  @Input()
  public set course(value: ICourse) {
    this._course = value;
    this.resetForm();
  }

  public resetForm() {
    this.courseEntityService.resetForm(this.course);
  }
}
