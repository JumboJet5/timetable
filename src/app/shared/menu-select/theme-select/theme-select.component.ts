import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThemeService } from 'src/app/service/theme/theme.service';
import { ITheme } from 'src/core/interfaces/theme.interface';
import { AsyncOptionsSelectComponent, optionServiceFactory } from '../async-options-select/async-options-select.component';

@Component({
  selector: 'app-theme-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class ThemeSelectComponent extends AsyncOptionsSelectComponent<ITheme> {
  constructor(public themeService: ThemeService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<ITheme>(id => themeService.getTheme(id),
      params => themeService.getThemes(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть назву предмета';
    this.multiplePlaceholder = 'Оберіть назви предмета';
    this.withSearch = false;
  }
}
