import { Injectable } from '@angular/core';
import { OptionInterface } from 'src/core/interfaces/interfaces';

@Injectable({providedIn: 'root'})
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
}
