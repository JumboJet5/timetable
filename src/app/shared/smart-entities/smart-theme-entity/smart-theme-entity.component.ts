import { Component } from '@angular/core';
import { ThemeEntityService } from '@app/service/theme-entity/theme-entity.service';
import { ThemeService } from '@app/service/theme/theme.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-smart-theme-entity',
  templateUrl: './smart-theme-entity.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/loader.scss',
    './smart-theme-entity.component.scss',
  ],
  providers: [ThemeEntityService],
})
export class SmartThemeEntityComponent extends SmartItemEntity<ITheme> {
  constructor(protected _themeService: ThemeService,
              public themeEntityService: ThemeEntityService) {
    super(_themeService, themeEntityService);
  }
}
