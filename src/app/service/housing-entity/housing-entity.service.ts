import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityFormService } from '@app/shared/classes/entity-form.service';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Injectable()
export class HousingEntityService extends EntityFormService<IHousing> {
  public form: FormGroup = new FormGroup({
    floors: new FormControl('', Validators.min(1)),
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    address: new FormControl(''),
    location: new FormControl(''),
    univ: new FormControl('', Validators.required),
  });
}
