import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { Subject } from 'rxjs';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-course-entity',
  templateUrl: './course-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './course-entity.component.scss'],
})
export class CourseEntityComponent implements OnDestroy {
  @Output() public save: EventEmitter<ICourse> = new EventEmitter<ICourse>();
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl();
  public specControl: FormControl = new FormControl('', Validators.required);
  public courseEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    degree: new FormControl(''),
    specialty: this.specControl,
    faculty: this.facControl,
    univ: this.univControl, // trigger reactForm dirty property
  });
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _specialtyService: SpecialtyService) { }

  private _course: ICourse;

  public get course(): ICourse {
    return this._course;
  }

  @Input()
  public set course(value: ICourse) {
    this._course = value;
    this.resetForm();
  }

  public resetForm(): void {
    this.courseEntityForm.reset({...this.course, univ: this.univControl.value, faculty: this.facControl.value});
  }

  public onLoadFaculty(faculty: IFaculty) {
    if (!!faculty && faculty.id === this.facControl.value && faculty.univ !== this.univControl.value)
      this.univControl.patchValue(faculty.univ, {onlySelf: true});
  }

  public onLoadSpecialty(specialty: ISpecialty) {
    if (!!specialty && specialty.id === this.specControl.value && specialty.faculty !== this.facControl.value)
      this.facControl.patchValue(specialty.faculty, {onlySelf: true});
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
