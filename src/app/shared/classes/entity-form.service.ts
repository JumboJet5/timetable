import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';


@Injectable()
export class EntityFormService<TItem extends object, TFormBody = TItem> {
  public form: FormGroup;
  public isAdditionalInfoReady = false;
  private _disabledControlNames: string[] = [];

  constructor(public formatService: FormatService) {
    this._getAllSatelliteInfo(); // todo move all logic from children constructors to this function
  }

  public resetForm(item: Partial<TFormBody>): void { // todo do something with it)) (actual for group, course, specialty)
    this.form.reset(item);
  }

  public getFormValue(): Partial<TItem> {
    this._disabledControlNames.forEach(controlName => this.form.get(controlName).enable({onlySelf: true, emitEvent: false}));
    const value = this.form.value;
    this._disabledControlNames.forEach(controlName => this.form.get(controlName).disable({onlySelf: true, emitEvent: false}));
    return value;
  }

  public getControlError(controlName: keyof TFormBody & string): string {
    return this.formatService.getControlError(this.form, controlName);
  }

  public disableControls(controlNames: (keyof TItem & string)[] = []): void {
    controlNames.forEach(controlName => {
      this.form.get(controlName).disable({onlySelf: true, emitEvent: false});
      if (!this._disabledControlNames.includes(controlName)) this._disabledControlNames.push(controlName);
    });
  }

  public enableControls(controlNames: string[] = []): void {
    controlNames.forEach(controlName => {
      this.form.get(controlName).enable({onlySelf: true, emitEvent: false});
      this._disabledControlNames = this._disabledControlNames.filter(item => item !== controlName);
    });
  }

  protected _getAllSatelliteInfo(): void {
    this.isAdditionalInfoReady = true;
  }
}
