import { Component, Input } from '@angular/core';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { ThemeService } from '@app/service/theme/theme.service';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-course-themes',
  templateUrl: './course-themes.component.html',
  styleUrls: [
    '../../../../../core/stylesheet/default-form.scss',
    '../../../../../core/stylesheet/loader.scss',
    './course-themes.component.scss',
  ],
})
export class CourseThemesComponent {
  public themes: ITheme[] = [];
  public isLoading = false;

  constructor(private _themeService: ThemeService,
              private _smartDetailsService: SmartDetailsService) {}

  private _courseId: number;

  @Input()
  public set courseId(value: number) {
    this._courseId = value;
    this._loadCourseThemes();
  }

  public openDetails(entity: ITheme) {
    this._smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.THEME};
  }

  private _loadCourseThemes(): void {
    this.isLoading = false;
    this._themeService.getItems({specialty: this._courseId})
      .subscribe(res => this.themes = res.results)
      .add(() => this.isLoading = false);
  }
}
