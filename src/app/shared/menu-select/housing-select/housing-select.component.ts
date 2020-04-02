import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { HousingService } from 'src/app/service/housing/housing.service';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';

@Component({
  selector: 'app-housing-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class HousingSelectComponent extends AsyncSelectorWithFiltersComponent<any> {
  constructor(public housingService: HousingService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<any>(id => housingService.getHousing(id),
      params => housingService.getHousings(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть корпус';
    this.multiplePlaceholder = 'Оберіть корпуси';
    this.withSearch = false;
  }
}
