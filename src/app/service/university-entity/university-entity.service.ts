import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityWithImageFormService } from '@app/shared/classes/entity-with-image-form.service';
import { IUniversity } from 'src/core/interfaces/university';

@Injectable({providedIn: 'root'})
export class UniversityEntityService extends EntityWithImageFormService<IUniversity> {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    img: new FormControl(null),
  });
}
