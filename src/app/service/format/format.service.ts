import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  public isControlValid(formGroup: FormGroup, controlName: string, control?: AbstractControl): boolean {
    control = control || (formGroup ? formGroup.get(controlName) : undefined);
    return control && (control.valid || control.untouched);
  }

  public getControlError(formGroup: FormGroup, controlName: string): string {
    const control = formGroup ? formGroup.get(controlName) : undefined;
    return this.isControlValid(formGroup, controlName, control) ? '' : control.errors.custom;
  }

  public getFormDataFromObject(obj: object): FormData {
    const formData = new FormData();
    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Array) obj[key].forEach(item => formData.append(key, item !== null && item !== undefined ? item : ''));
      else formData.append(key, obj[key] !== null && obj[key] !== undefined ? obj[key] : '');
    });
    return formData;
  }

  public unificationOptions(array: OptionInterface[], sortByField: string): void {
    const sortedCopy = [...array.sort((first, second) => this._compareOptions(first, second, sortByField))];
    array.splice(0, array.length);
    array.push(...sortedCopy.filter((item, index, arr) => !arr[index + 1] || item.id !== arr[index + 1].id));
  }

  public isOptionSearched(option: OptionInterface, search: string): boolean {
    return option.name.includes(search) || option.short_name.includes(search) || option.slug.includes(search);
  }

  private _compareOptions(first: OptionInterface, second: OptionInterface, byField: string): number {
    return first[byField] ? first[byField].localeCompare(second[byField]) : first[byField] === second[byField];
  }
}
