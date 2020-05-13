import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityWithImageFormService } from '@app/shared/classes/entity-with-image-form.service';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Injectable()
export class FacultyEntityService extends EntityWithImageFormService<IFaculty> {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    univ: new FormControl('', Validators.required),
    img: new FormControl(null),
  });
}
