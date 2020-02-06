import { Injectable } from '@angular/core';
import { OptionInterface } from 'src/core/interfaces/interfaces';

@Injectable()
export class FormatService {
  public getFormDataFromObject(obj: object): FormData {
    const formData = new FormData();
    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Array) obj[key].forEach(
        item => formData.append(key, item !== null && item !== undefined ? item : ''));
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
