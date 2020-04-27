import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormatService } from '@app/service/format/format.service';
import { IUniversity } from 'src/core/interfaces/university';

@Injectable({
  providedIn: 'root',
})
export class UniversityEntityService {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    img: new FormControl(null),
  });
  public imageSrc: SafeUrl | string;

  constructor(public formatService: FormatService,
              private _domSanitizer: DomSanitizer) { }

  public resetForm(univ: Partial<IUniversity>): void {
    this.form.reset(univ);
    this.imageSrc = univ.img;
  }

  public getImagePath(img: File): void {
    this.imageSrc = img ? this._domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img)) : '';
    this.form.get('img').patchValue(img);
    this.form.get('img').markAsDirty();
  }

  public getControlError(controlName: keyof IUniversity): string {
    return this.formatService.getControlError(this.form, controlName);
  }
}
