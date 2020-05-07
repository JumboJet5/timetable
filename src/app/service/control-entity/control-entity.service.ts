import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { FormatService } from '@app/service/format/format.service';
import { GroupService } from '@app/service/group/group.service';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { IControl } from 'src/core/interfaces/control.interface';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';

@Injectable()
export class ControlEntityService {
  public isAllFiltersReady = false;
  public groupIdFilter: IFilterParams;
  public teachersFilter: IFilterParams;
  public roomFilter: IFilterParams;
  public subgroupsCount: number;
  public semester: ISemester;
  public subgroupControl: FormControl = new FormControl('');
  public linkControl: FormControl = new FormControl('');
  public housingControl: FormControl = new FormControl('', Validators.required);
  public dateControl: FormControl = new FormControl('', Validators.required);
  public dayControl: FormControl = new FormControl('', Validators.required);
  public roomControl: FormControl = new FormControl('', Validators.required);
  public themeControl: FormControl = new FormControl('', Validators.required);
  public conductTypeControl: FormControl = new FormControl('', Validators.required);
  public formatControl: FormControl = new FormControl('', Validators.required);
  public teachersControl: FormControl = new FormControl('', Validators.required);
  public groupsemesterControl: FormControl = new FormControl('', Validators.required);
  public form: FormGroup = new FormGroup({
    format: this.formatControl,
    date: this.dateControl,
    start: new FormControl('', Validators.required),
    subgroup: this.subgroupControl,
    theme: this.themeControl,
    housing: this.housingControl,
    room: this.roomControl,
    group_semester: this.groupsemesterControl,
    teachers: this.teachersControl,
    conduct_type: this.conductTypeControl,
    link: this.linkControl,
    day: this.dayControl,
  });

  constructor(public formatService: FormatService,
              private semesterService: SemesterService,
              private dateFormatService: DateFormatService,
              private groupService: GroupService,
              private groupsemesterService: GroupsemesterService) {
    this.housingControl.valueChanges
      .subscribe(housing => {
        if (!!housing && this.roomControl.disabled) this.roomControl.enable();
        if (!housing && this.roomControl.enabled) this.roomControl.disable();
        this.roomFilter = {housing};
      });

    this.conductTypeControl.valueChanges
      .subscribe(type => {
        if (!!type && type === 'online') this.linkControl.enable();
        else this.linkControl.disable();
      });

    this.groupsemesterControl.valueChanges
      .pipe(tap(() => this.isAllFiltersReady = false))
      .pipe(switchMap(value => this.groupsemesterService.getGroupsemester(value)))
      .subscribe(groupsemester => this.getInfo(groupsemester));

    this.dayControl.valueChanges
      .subscribe(value => this.dateControl.patchValue(dateFormatService.getDateString(value)));

    this.dateControl.valueChanges
      .subscribe(value => this.dayControl.patchValue(dateFormatService.getDateFromString(value), {emitEvent: false}));
  }

  public resetForm(course: Partial<IControl>): void {
    this.form.reset({...course, day: this.dateFormatService.getDateFromString(course.date)});
  }

  public getEnableRangeDates(): { min: Date, max: Date } {
    const min = !!this.semester ? new Date(this.semester.start) : undefined;
    const max = !!this.semester ? new Date(this.semester.end) : undefined;
    return {min, max};
  }

  public getControlError(controlName: keyof IControl): string {
    return this.formatService.getControlError(this.form, controlName);
  }

  private getInfo(groupsemester: IGroupsemester): void {
    this.groupIdFilter = {group: groupsemester.group};
    this.teachersFilter = {group: groupsemester.group, ordering: 'last_name'};
    this.isAllFiltersReady = true;
    this.groupService.getGroup(groupsemester.group)
      .pipe(filter(value => !!value))
      .subscribe(group => {
        this.subgroupsCount = group.subgroups;
        this.subgroupControl.setValidators(Validators.max(group.subgroups));
      });

    this.semesterService.getSemester(groupsemester.semester)
      .subscribe(semester => this.semester = semester);
  }
}
