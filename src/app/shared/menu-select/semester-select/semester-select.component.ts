import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SemesterService } from '@app/service/semester/semester.service';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { AsyncOptionsSelectComponent, optionServiceFactory } from '../async-options-select/async-options-select.component';

@Component({
  selector: 'app-semester-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class SemesterSelectComponent extends AsyncOptionsSelectComponent<ISemester> {
  constructor(public semesterService: SemesterService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<ISemester>(id => semesterService.getSemester(id),
      params => semesterService.getSemesters(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть семестр';
    this.multiplePlaceholder = 'Оберіть семестри';
  }

  public getOptionText(id: number): string {
    return this.getOptionById(id) ? this.getOptionById(id).num + ' семестр' : undefined;
  }
}
