import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { TeacherService } from 'src/app/service/teacher/teacher.service';
import { ITeacher } from 'src/core/interfaces/teacher.interface';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';

@Component({
  selector: 'app-teacher-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class TeacherSelectComponent extends AsyncSelectorWithFiltersComponent<ITeacher> {
  constructor(public teacherService: TeacherService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<ITeacher>(id => teacherService.getTeacher(id),
      params => teacherService.getTeachers(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть викладача';
    this.multiplePlaceholder = 'Оберіть викладачів';
    this.withSearch = true;
  }

  public getOptionText(id: number) {
    return this.getOptionById(id) ? this.getOptionById(id).full_name : '';
  }
}
