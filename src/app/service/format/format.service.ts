import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IGroup } from 'src/core/interfaces/group.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { IWithId } from 'src/core/interfaces/select-option.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Injectable({providedIn: 'root'})
export class FormatService {
  public getFormDataFromObject(obj: object): FormData {
    const formData = new FormData();
    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Array) obj[key].forEach(
        item => formData.append(key, item !== null && item !== undefined ? item : ''));
      else if (obj[key] instanceof File) formData.append(key, obj[key], obj[key].name);
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


  public isControlValid(formGroup: FormGroup, controlName: string, control?: AbstractControl): boolean {
    control = control || (formGroup ? formGroup.get(controlName) : undefined);
    return control && (control.valid || control.untouched);
  }

  public getControlError(formGroup: FormGroup, controlName: string): string {
    const control = formGroup ? formGroup.get(controlName) : undefined;
    if (!control || !control.errors || this.isControlValid(formGroup, controlName, control)) return '';
    if (control.errors.required) return 'Обов`язкове поле';
    if (control.errors.pattern) return 'Поле не відповідає патерну';
    if (control.errors.min) return 'Недостатньо велике число';
    return 'Не валідне поле';
  }

  public onLoadFaculty(faculty: IFaculty, facControl: FormControl, univControl: FormControl): void {
    this.autoPatchAddictedControl(faculty, 'univ', facControl, univControl);
  }

  public onLoadSpecialty(specialty: ISpecialty, specControl: FormControl, facControl: FormControl): void {
    this.autoPatchAddictedControl(specialty, 'faculty', specControl, facControl);
  }

  public onLoadCourse(course: ICourse, courseControl: FormControl, specControl: FormControl): void {
    this.autoPatchAddictedControl(course, 'specialty', courseControl, specControl);
  }

  public onLoadGroup(group: IGroup, groupControl: FormControl, courseControl: FormControl, groupIdKey: 'id' | 'slug' = 'id'): void {
    this.autoPatchAddictedControl(group, 'course', groupControl, courseControl, groupIdKey);
  }

  public autoPatchAddictedControl<T extends IWithId>(entity: T, key: keyof T, srcControl: FormControl, dstControl: FormControl,
                                                     entityIdKey: string = 'id'): void {
    if (!!srcControl && !!dstControl && !!entity && entity[entityIdKey] === srcControl.value && entity[key] !== dstControl.value)
      dstControl.patchValue(entity[key]);
  }

  public getParamsCut(keys: (keyof IFilterParams)[], params: IFilterParams): IFilterParams {
    return keys.reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {});
  }
}
