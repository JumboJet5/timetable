import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityFormService } from '@app/shared/classes/entity-form.service';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Injectable()
export class ThemeEntityService extends EntityFormService<ITheme> {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
  });
}
