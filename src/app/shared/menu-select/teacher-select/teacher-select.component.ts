import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TeacherService } from 'src/app/service/teacher/teacher.service';
import { ITeacher } from 'src/core/interfaces/teacher.interface';
import { AsyncOptionsSelectComponent, optionServiceFactory } from '../async-options-select/async-options-select.component';

@Component({
  selector: 'app-teacher-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
  providers: [TeacherService]
})
export class TeacherSelectComponent extends AsyncOptionsSelectComponent<ITeacher> {
  constructor(public teacherService: TeacherService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<ITeacher>(id => teacherService.getTeacher(id),
      params => teacherService.getTeachers(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть викладача';
    this.multiplePlaceholder = 'Оберіть викладачів';
    this.withSearch = true;
  }

  public getOptionText(id: number) {
    return this.getOptionById(id) ? this.getOptionById(id).full_name : '';
  }
}
