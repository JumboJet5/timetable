import { Component, Input } from '@angular/core';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-specialty-themes',
  templateUrl: './specialty-themes.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './specialty-themes.component.scss'],
})
export class SpecialtyThemesComponent {
  @Input() themes: ITheme[] = [];
  @Input() public isLoading = false;
}
