import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FormatService } from '@app/service/format/format.service';
import { EntityWithImageFormService } from '@app/shared/classes/entity-with-image-form.service';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { ISpecialty, ISpecialtyEntity } from 'src/core/interfaces/specialty.interface';

@Injectable()
export class SpecialtyEntityService extends EntityWithImageFormService<ISpecialty, ISpecialtyEntity> {
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

  public univDrop: (keyof IFilterParams)[] = ['univ'];
  public univFilters: IFilterParams = this.formatService.getParamsCut(this.univDrop, this.form.value);

  constructor(public formatService: FormatService,
              public domSanitizer: DomSanitizer) {
    super(formatService, domSanitizer);

    this.form.valueChanges
      .subscribe(value => {
        if (this.univFilters.univ !== value.univ) this.univFilters = this.formatService.getParamsCut(this.univDrop, this.form.value);
      });
  }

  public onLoadFaculty(faculty: IFaculty): void {
    this.formatService.onLoadFaculty(faculty, this.facControl, this.univControl);
  }
}
