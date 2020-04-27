import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormatService } from '@app/service/format/format.service';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { ISpecialtyEntity } from 'src/core/interfaces/specialty.interface';

@Injectable()
export class SpecialtyEntityService {
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl('', Validators.required);
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    interface_type: new FormControl('', Validators.required),
    desc: new FormControl(''),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    faculty: this.facControl,
    univ: this.univControl, // trigger reactForm dirty property
    img: new FormControl(null),
  });
  public imageSrc: SafeUrl | string;
  public univDrop: (keyof IFilterParams)[] = ['univ'];
  public univFilters: IFilterParams = this.formatService.getParamsCut(this.univDrop, this.form.value);

  constructor(public formatService: FormatService,
              private _domSanitizer: DomSanitizer) {
    this.form.valueChanges
      .subscribe(value => {
        if (this.univFilters.univ !== value.univ) this.univFilters = this.formatService.getParamsCut(this.univDrop, this.form.value);
      });
  }

  public resetForm(specialty: Partial<ISpecialtyEntity>): void {
    this.form.reset({...specialty, univ: this.univControl.value});
    this.imageSrc = specialty.img;
  }

  public getImagePath(img: File): void {
    this.imageSrc = img ? this._domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img)) : '';
    this.form.get('img').patchValue(img);
    this.form.get('img').markAsDirty();
  }

  public onLoadFaculty(faculty: IFaculty): void {
    this.formatService.onLoadFaculty(faculty, this.facControl, this.univControl);
  }

  public getControlError(controlName: keyof ISpecialtyEntity): string {
    return this.formatService.getControlError(this.form, controlName);
  }
}
