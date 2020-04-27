import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateInfoGroupsemester, IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';

@Injectable()
export class GroupsemesterEntityService {
  public form: FormGroup = new FormGroup({
    group: new FormControl('', Validators.required),
    semester: new FormControl('', Validators.required),
    show_lessons_number: new FormControl(true),
    lessons_time: new FormControl([]),
    themes: new FormControl([]),
  });

  private _groupFilters: IFilterParams = {group: this.form.get('group').value};

  public get groupFilters(): IFilterParams {
    Object.assign(this._groupFilters, {group: this.form.get('group').value});
    return this._groupFilters;
  }

  public resetForm(groupsemester: Partial<IGroupsemester>): void {
    this.form.patchValue(groupsemester);
    if (groupsemester.group) this.form.get('group').disable({onlySelf: true});
  }

  public getFormValue(): ICreateInfoGroupsemester {
    this.form.get('group').enable();
    const result = this.form.value;
    if (this.form.value.group) this.form.get('group').disable({onlySelf: true});
    return result;
  }
}
