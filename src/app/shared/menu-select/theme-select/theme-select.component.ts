import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { ThemeService } from 'src/app/service/theme/theme.service';
import { ITheme } from 'src/core/interfaces/theme.interface';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';

@Component({
  selector: 'app-theme-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class ThemeSelectComponent extends AsyncSelectorWithFiltersComponent<ITheme> {
  constructor(public themeService: ThemeService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<ITheme>(id => themeService.getItem(id),
      params => themeService.getItems(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть назву предмета';
    this.multiplePlaceholder = 'Оберіть назви предмета';
    this.withSearch = false;
  }
}
