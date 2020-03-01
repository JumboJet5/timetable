import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UniversityService } from '@app/service/universitiy/university.service';
import {
  AsyncOptionsSelectComponent, optionServiceFactory,
} from '@app/shared/menu-select/async-options-select/async-options-select.component';
import { IUniversity } from 'src/core/interfaces/university';

@Component({
  selector: 'app-university-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class UniversitySelectComponent extends AsyncOptionsSelectComponent<IUniversity> {
  constructor(public universityService: UniversityService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<any>(id => universityService.getUniversity(id),
      params => universityService.getUniversities(params)), formBuilder);
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
