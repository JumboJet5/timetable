import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HousingService } from 'src/app/service/housing/housing.service';
import { AsyncOptionsSelectComponent, optionServiceFactory } from '../async-options-select/async-options-select.component';

@Component({
  selector: 'app-housing-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
  providers: [HousingService],
})
export class HousingSelectComponent extends AsyncOptionsSelectComponent<any> {
  constructor(public housingService: HousingService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<any>(id => housingService.getHousing(id),
      params => housingService.getHousings(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть корпус';
    this.multiplePlaceholder = 'Оберіть корпуси';
    this.withSearch = false;
  }
}
