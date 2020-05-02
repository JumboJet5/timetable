import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { IRoom } from 'src/core/interfaces/room.interface';

@Injectable()
export class RoomEntityService {
  public housingControl: FormControl = new FormControl('', Validators.required);
  public form: FormGroup = new FormGroup({
    num: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.min(0)),
    housing: this.housingControl,
  });

  constructor(private _formatService: FormatService) {}

  private _defaultHousingDisabling = true;

  public get defaultHousingDisabling(): boolean {
    return this._defaultHousingDisabling;
  }

  public set defaultHousingDisabling(value: boolean) {
    this._defaultHousingDisabling = value;
    if (value && this.housingControl.enabled) this.housingControl.disable({onlySelf: true});
    else if (!value && this.housingControl.disabled) this.housingControl.enable({onlySelf: true});
  }

  public resetForm(theme: Partial<IRoom>): void {
    this.form.reset(theme);
    if (this.defaultHousingDisabling) this.housingControl.disable();
  }

  public getFormValue(): IRoom {
    this.form.get('housing').enable();
    const result = this.form.value;
    if (this.form.value.univ) this.form.get('housing').disable({onlySelf: true});
    return result;
  }

  public getControlError(controlName: keyof IRoom): string {
    return this._formatService.getControlError(this.form, controlName);
  }
}
