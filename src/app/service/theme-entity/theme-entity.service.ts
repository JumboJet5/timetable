import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Injectable()
export class ThemeEntityService {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
  });

  constructor(private _formatService: FormatService) {}

  public resetForm(theme: Partial<ITheme>): void {
    this.form.reset(theme);
  }

  public getControlError(controlName: keyof ITheme): string {
    return this._formatService.getControlError(this.form, controlName);
  }
}
