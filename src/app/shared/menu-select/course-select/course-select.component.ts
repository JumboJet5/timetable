import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CourseService } from '@app/service/course/course.service';
import { FormatService } from '@app/service/format/format.service';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';
import { ICourse } from 'src/core/interfaces/course.interface';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';

@Component({
  selector: 'app-course-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class CourseSelectComponent extends AsyncSelectorWithFiltersComponent<ICourse> {
  constructor(public courseService: CourseService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<ICourse>(id => courseService.getCourse(id),
      params => courseService.getCourses(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть курс';
    this.multiplePlaceholder = 'Оберіть курси';
  }
}
