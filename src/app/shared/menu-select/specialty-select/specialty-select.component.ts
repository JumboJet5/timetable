import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import {
  AsyncOptionsSelectComponent, optionServiceFactory,
} from '@app/shared/menu-select/async-options-select/async-options-select.component';

@Component({
  selector: 'app-specialty-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class SpecialtySelectComponent extends AsyncOptionsSelectComponent<any> {
  constructor(public specialtyService: SpecialtyService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<any>(id => specialtyService.getSpecialty(id),
      params => specialtyService.getSpecialties(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть спеціальність';
    this.multiplePlaceholder = 'Оберіть спеціальності';
    this.withSearch = true;
  }
}
