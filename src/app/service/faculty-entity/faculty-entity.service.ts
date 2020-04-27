import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormatService } from '@app/service/format/format.service';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Injectable()
export class FacultyEntityService {
  public univControl: FormControl = new FormControl('', Validators.required);
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    univ: this.univControl,
    img: new FormControl(null),
  });
  public imageSrc: SafeUrl | string;

  constructor(public formatService: FormatService,
              private _domSanitizer: DomSanitizer) { }

  public resetForm(faculty: Partial<IFaculty>): void {
    this.form.reset(faculty);
    this.imageSrc = faculty.img;
  }

  public getImagePath(img: File): void {
    this.imageSrc = img ? this._domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img)) : '';
    this.form.get('img').patchValue(img);
    this.form.get('img').markAsDirty();
  }

  public getControlError(controlName: keyof IFaculty): string {
    return this.formatService.getControlError(this.form, controlName);
  }
}
