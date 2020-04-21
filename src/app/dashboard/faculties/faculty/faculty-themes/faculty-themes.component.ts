import { Component, Input } from '@angular/core';
import { ThemeService } from '@app/service/theme/theme.service';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-faculty-themes',
  templateUrl: './faculty-themes.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './faculty-themes.component.scss'],
})
export class FacultyThemesComponent {
  public themes: ITheme[] = [];
  public isLoading = false;

  constructor(private _themeService: ThemeService) {}

  private _facultyId: number;

  @Input()
  public set facultyId(value: number) {
    this._facultyId = value;
    this._loadFacultyThemes();
  }

  private _loadFacultyThemes(): void {
    this.isLoading = true;
    this._themeService.getThemes({faculty: this._facultyId})
      .subscribe(res => this.themes = res.results)
      .add(() => this.isLoading = false);
  }
}
