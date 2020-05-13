import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { ITheme } from 'src/core/interfaces/theme.interface';
import { THEME, THEMES } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class ThemeService extends EntityCrudService<ITheme> {
  protected _itemsURL = THEMES;
  protected _itemURL = THEME;
}
