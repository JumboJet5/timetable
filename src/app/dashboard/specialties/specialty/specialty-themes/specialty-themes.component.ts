import { Component, Input } from '@angular/core';
import { ThemeService } from '@app/service/theme/theme.service';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-specialty-themes',
  templateUrl: './specialty-themes.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './specialty-themes.component.scss'],
})
export class SpecialtyThemesComponent {
  public themes: ITheme[] = [];
  public isLoading = false;

  constructor(private _themeService: ThemeService) {}

  private _specialtyId: number;

  @Input()
  public set specialtyId(value: number) {
    this._specialtyId = value;
    this._loadSpecialtyThemes();
  }

  private _loadSpecialtyThemes(): void {
    this.isLoading = false;
    this._themeService.getThemes({specialty: this._specialtyId})
      .subscribe(res => this.themes = res.results)
      .add(() => this.isLoading = false);
  }
}
