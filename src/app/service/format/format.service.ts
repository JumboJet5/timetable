import { Injectable } from '@angular/core';

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

  public isObjectsSimilar<T>(group1: T, group2: T): boolean {
    if (typeof group1 !== 'object' || typeof group2 !== 'object') return group1 === group2;
    return Object.keys(group1)
      .every(key => group1[key] === group2[key] || (typeof group1 === typeof group2 && this.isObjectsSimilar(group1[key], group2[key])));
  }

  public getObjectsKeyWithDifference<T>(group1: T, group2: T): string[] {
    if (typeof group1 !== 'object' || typeof group2 !== 'object') return [];
    const difference1 = Object.keys(group1)
      .filter(key => group1[key] !== group2[key] && (typeof group1 !== typeof group2 || !this.isObjectsSimilar(group1[key], group2[key])));
    const difference2 = Object.keys(group2)
      .filter(key => !difference1.includes(key) && group1[key] !== group2[key]
          && (typeof group1 !== typeof group2 || !this.isObjectsSimilar(group1[key], group2[key])));
    return [...difference1, ...difference2];
  }
}
