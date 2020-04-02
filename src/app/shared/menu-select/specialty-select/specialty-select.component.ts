import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';

@Component({
  selector: 'app-specialty-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class SpecialtySelectComponent extends AsyncSelectorWithFiltersComponent<ISpecialty> {
  constructor(public specialtyService: SpecialtyService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<ISpecialty>(id => specialtyService.getSpecialty(id),
      params => specialtyService.getSpecialties(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть спеціальність';
    this.multiplePlaceholder = 'Оберіть спеціальності';
    this.withSearch = true;
  }
}
