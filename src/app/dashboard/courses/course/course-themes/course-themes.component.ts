import { Component, Input } from '@angular/core';
import { ThemeService } from '@app/service/theme/theme.service';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-course-themes',
  templateUrl: './course-themes.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './course-themes.component.scss'],
})
export class CourseThemesComponent {
  public themes: ITheme[] = [];
  public isLoading = false;

  constructor(private _themeService: ThemeService) {}

  private _courseId: number;

  @Input()
  public set courseId(value: number) {
    this._courseId = value;
    this._loadCourseThemes();
  }

  private _loadCourseThemes(): void {
    this.isLoading = false;
    this._themeService.getThemes({specialty: this._courseId})
      .subscribe(res => this.themes = res.results)
      .add(() => this.isLoading = false);
  }
}
