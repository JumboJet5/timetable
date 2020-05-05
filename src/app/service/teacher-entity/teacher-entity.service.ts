import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormatService } from '@app/service/format/format.service';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { ITeacher } from 'src/core/interfaces/teacher.interface';

@Injectable()
export class TeacherEntityService {
  public univControl: FormControl = new FormControl('', Validators.required);
  public degreeControl: FormControl = new FormControl('', Validators.required);
  public form: FormGroup = new FormGroup({
    full_name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    degree: this.degreeControl,
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    univ: this.univControl,
    img: new FormControl(null),
  });
  public imageSrc: SafeUrl | string;
  public univDrop: (keyof IFilterParams)[] = ['univ'];

  constructor(public formatService: FormatService,
              private _domSanitizer: DomSanitizer) {}

  public resetForm(teacher: Partial<ITeacher>): void {
    this.form.reset({...teacher});
    this.imageSrc = teacher.img;
  }

  public getImagePath(img: File): void {
    this.imageSrc = img ? this._domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img)) : '';
    this.form.get('img').patchValue(img);
    this.form.get('img').markAsDirty();
  }

  public getControlError(controlName: keyof ITeacher): string {
    return this.formatService.getControlError(this.form, controlName);
  }
}
