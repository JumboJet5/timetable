import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { GroupService } from '@app/service/group/group.service';
import { Subject } from 'rxjs';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IGroup, IUpdateGroup } from 'src/core/interfaces/group.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-group-entity',
  templateUrl: './group-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './group-entity.component.scss'],
})
export class GroupEntityComponent implements OnDestroy {
  @Output() save: EventEmitter<IUpdateGroup> = new EventEmitter<IUpdateGroup>();
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl();
  public specControl: FormControl = new FormControl();
  public courseControl: FormControl = new FormControl(undefined, Validators.required);
  public yearControl: FormControl = new FormControl(undefined, Validators.required);
  public groupEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    subgroups: new FormControl('', Validators.min(0)),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    univ: this.univControl,
    faculty: this.facControl,
    specialty: this.specControl,
    course: this.courseControl,
    year: this.yearControl,
  });
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _groupService: GroupService) { }

  private _group: IGroup;

  public get group(): IGroup {
    return this._group;
  }

  @Input()
  public set group(value: IGroup) {
    this._group = value;
    this.resetForm();
  }

  public resetForm(): void {
    this.groupEntityForm.reset(this.group);
  }

  public onLoadFaculty(faculty: IFaculty) {
    if (!!faculty && faculty.id === this.facControl.value && faculty.univ !== this.univControl.value)
      this.univControl.patchValue(faculty.univ, {onlySelf: true});
  }

  public onLoadSpecialty(specialty: ISpecialty) {
    if (!!specialty && specialty.id === this.specControl.value && specialty.faculty !== this.facControl.value)
      this.facControl.patchValue(specialty.faculty, {onlySelf: true});
  }

  public onLoadCourse(course: ICourse) {
    if (!!course && course.id === this.courseControl.value && course.specialty !== this.specControl.value)
      this.specControl.patchValue(course.specialty, {onlySelf: true});
  }

  public isControlValid(formGroup: FormGroup, controlName: string, control?: AbstractControl): boolean {
    control = control || (formGroup ? formGroup.get(controlName) : undefined);
    return control && (control.valid || control.untouched);
  }

  public getControlError(formGroup: FormGroup, controlName: string): string {
    const control = formGroup ? formGroup.get(controlName) : undefined;
    if (!control || this.isControlValid(formGroup, controlName, control)) return '';
    if (control.errors.required) return 'Обов`язкове поле';
    if (control.errors.pattern) return 'Поле не відповідає патерну';
    if (control.errors.min) return 'Недостатньо велике число';
    return 'Не валідне поле';
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
