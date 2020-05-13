import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { UniversityService } from '@app/service/universitiy/university.service';
import { IUniversity } from 'src/core/interfaces/university';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';

@Component({
  selector: 'app-university-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class UniversitySelectComponent extends AsyncSelectorWithFiltersComponent<IUniversity> {
  constructor(public universityService: UniversityService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<any>(id => universityService.getItem(id),
      params => universityService.getItems(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть університет';
    this.multiplePlaceholder = 'Оберіть університети';
  }

  public getOptionText(id: number) {
    return this.getOptionById(id) ? this.getOptionById(id).short_name : '';
  }

  public getOptionTitleText(id: number) {
    return this.getOptionById(id) ? this.getOptionById(id).name : '';
  }
}
