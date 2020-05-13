import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { YearService } from '@app/service/year/year.service';
import { IYear } from 'src/core/interfaces/year.interface';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';

@Component({
  selector: 'app-year-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class YearSelectComponent extends AsyncSelectorWithFiltersComponent<IYear> {
  constructor(public yearService: YearService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<any>(id => yearService.getItem(id),
      params => yearService.getItems(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть рік';
    this.multiplePlaceholder = 'Оберіть роки';
  }

  private static _transformDate(date: string): string {
    return date.replace(/^([\d]{4})-([\d]{2})-([\d]{2}$)/gi, (...args) => `${args[3]}.${args[2]}.${args[1]}`);
  }

  public getOptionText(id: number) {
    const option = this.getOptionById(id);
    return !!option ? `${YearSelectComponent._transformDate(option.start)} - ${YearSelectComponent._transformDate(option.end)}` : '';
  }
}
