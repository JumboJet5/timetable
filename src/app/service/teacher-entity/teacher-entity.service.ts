import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityWithImageFormService } from '@app/shared/classes/entity-with-image-form.service';
import { ITeacher } from 'src/core/interfaces/teacher.interface';

@Injectable()
export class TeacherEntityService extends EntityWithImageFormService<ITeacher> {
  public form: FormGroup = new FormGroup({
    full_name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    degree: new FormControl('', Validators.required),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    univ: new FormControl('', Validators.required),
    img: new FormControl(null),
  });
}
