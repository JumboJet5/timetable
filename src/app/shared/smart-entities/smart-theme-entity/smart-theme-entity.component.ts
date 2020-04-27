import { Component, Input } from '@angular/core';
import { ThemeEntityService } from '@app/service/theme-entity/theme-entity.service';
import { ThemeService } from '@app/service/theme/theme.service';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-smart-theme-entity',
  templateUrl: './smart-theme-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-theme-entity.component.scss'],
  providers: [ThemeEntityService],
})
export class SmartThemeEntityComponent {
  public isLoading = false;

  constructor(public themeEntityService: ThemeEntityService,
              private _themeService: ThemeService) { }

  private _theme: ITheme;

  public get theme(): ITheme {
    return this._theme;
  }

  @Input()
  public set theme(value: ITheme) {
    this._theme = value;
    this.reset();
  }

  public save() {
    if (this.themeEntityService.form.invalid || !this.theme) return;

    this.isLoading = true;
    this._themeService.updateTheme(this.theme.id, this.themeEntityService.form.value)
      .subscribe(res => Object.assign(this.theme, res))
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.themeEntityService.resetForm(this.theme);
  }
}
