import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';

@Component({
  selector: 'app-semester-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class SemesterSelectComponent extends AsyncSelectorWithFiltersComponent<ISemester> {
  constructor(public semesterService: SemesterService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<ISemester>(id => semesterService.getSemester(id),
      params => semesterService.getSemesters(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть семестр';
    this.multiplePlaceholder = 'Оберіть семестри';
  }

  public getOptionText(id: number): string {
    return this.getOptionById(id) ? this.getOptionById(id).num + ' семестр' : undefined;
  }
}
