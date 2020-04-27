import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Injectable()
export class HousingEntityService {
  public univControl: FormControl = new FormControl('', Validators.required);
  public form: FormGroup = new FormGroup({
    floors: new FormControl('', Validators.min(1)),
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    address: new FormControl(''),
    location: new FormControl(''),
    univ: this.univControl,
  });

  constructor(public formatService: FormatService) { }

  public resetForm(housing: Partial<IHousing>): void {
    this.form.patchValue(housing);
    if (housing.univ) this.form.get('univ').disable({onlySelf: true});
  }

  public getFormValue(): IHousing {
    this.form.get('univ').enable();
    const result = this.form.value;
    if (this.form.value.univ) this.form.get('univ').disable({onlySelf: true});
    return result;
  }

  public getControlError(controlName: keyof IHousing): string {
    return this.formatService.getControlError(this.form, controlName);
  }
}
