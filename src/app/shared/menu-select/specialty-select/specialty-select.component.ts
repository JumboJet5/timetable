import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import {
  AsyncOptionsSelectComponent, optionServiceFactory,
} from '@app/shared/menu-select/async-options-select/async-options-select.component';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialty-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class SpecialtySelectComponent extends AsyncOptionsSelectComponent<ISpecialty> {
  constructor(public specialtyService: SpecialtyService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<ISpecialty>(id => specialtyService.getSpecialty(id),
      params => specialtyService.getSpecialties(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть спеціальність';
    this.multiplePlaceholder = 'Оберіть спеціальності';
    this.withSearch = true;
  }
}
