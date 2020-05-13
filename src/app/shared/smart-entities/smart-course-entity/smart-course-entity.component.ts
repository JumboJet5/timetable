import { Component, Input } from '@angular/core';
import { CourseEntityService } from '@app/service/course-entity/course-entity.service';
import { CourseService } from '@app/service/course/course.service';
import { ICourse } from 'src/core/interfaces/course.interface';

@Component({
  selector: 'app-smart-course-entity',
  templateUrl: './smart-course-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-course-entity.component.scss'],
  providers: [CourseEntityService],
})
export class SmartCourseEntityComponent {
  public isLoading = false;

  constructor(private courseService: CourseService,
              public courseEntityService: CourseEntityService) { }

  private _course: ICourse;

  public get course(): ICourse {
    return this._course;
  }

  @Input()
  public set course(value: ICourse) {
    this._course = value;
    this.reset();
  }

  public save() {
    if (this.courseEntityService.form.invalid || !this.course) return;

    this.isLoading = true;
    this.courseService.updateItem(this.course.id, this.courseEntityService.form.value)
      .subscribe(res => Object.assign(this.course, res) && this.reset())
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.courseEntityService.resetForm(this.course);
  }
}
