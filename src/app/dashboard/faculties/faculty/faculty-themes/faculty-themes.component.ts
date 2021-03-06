import { Component, Input } from '@angular/core';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { ThemeService } from '@app/service/theme/theme.service';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-faculty-themes',
  templateUrl: './faculty-themes.component.html',
  styleUrls: [
    '../../../../../core/stylesheet/default-form.scss',
    '../../../../../core/stylesheet/loader.scss',
    './faculty-themes.component.scss',
  ],
})
export class FacultyThemesComponent {
  public themes: ITheme[] = [];
  public isLoading = false;

  constructor(private _themeService: ThemeService,
              private _smartDetailsService: SmartDetailsService) {}

  private _facultyId: number;

  @Input()
  public set facultyId(value: number) {
    this._facultyId = value;
    this._loadFacultyThemes();
  }

  public openDetails(entity: ITheme) {
    this._smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.THEME};
  }

  private _loadFacultyThemes(): void {
    this.isLoading = true;
    this._themeService.getItems({faculty: this._facultyId})
      .subscribe(res => this.themes = res.results)
      .add(() => this.isLoading = false);
  }
}
