import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { FormatService } from '@app/service/format/format.service';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';

@Component({
  selector: 'app-faculty-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class FacultySelectComponent extends AsyncSelectorWithFiltersComponent<IFaculty> {
  constructor(public facultyService: FacultyService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<IFaculty>(id => facultyService.getItem(id),
      params => facultyService.getItems(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть факультет';
    this.multiplePlaceholder = 'Оберіть факультети';
    this.withSearch = true;
  }
}
