import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CourseService } from '@app/service/course/course.service';
import { AsyncOptionsSelectComponent, optionServiceFactory } from '../async-options-select/async-options-select.component';
import { ICourse } from 'src/core/interfaces/course.interface';

@Component({
  selector: 'app-course-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class CourseSelectComponent extends AsyncOptionsSelectComponent<ICourse> {
  constructor(public courseService: CourseService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<ICourse>(id => courseService.getCourse(id),
        params => courseService.getCourses(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть курс';
    this.multiplePlaceholder = 'Оберіть курси';
  }
}
