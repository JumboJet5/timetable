import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FacultyService } from '@app/service/faculty/faculty.service';
import {
  AsyncOptionsSelectComponent, optionServiceFactory,
} from '@app/shared/menu-select/async-options-select/async-options-select.component';

@Component({
  selector: 'app-faculty-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class FacultySelectComponent extends AsyncOptionsSelectComponent<any> {
  constructor(public facultyService: FacultyService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<any>(id => facultyService.getFaculty(id),
      params => facultyService.getFaculties(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть факультет';
    this.multiplePlaceholder = 'Оберіть факультети';
    this.withSearch = true;
  }
}
