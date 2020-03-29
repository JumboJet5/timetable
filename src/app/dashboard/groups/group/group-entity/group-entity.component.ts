import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { GroupService } from '@app/service/group/group.service';
import { CourseSelectComponent } from '@app/shared/menu-select/course-select/course-select.component';
import { FacultySelectComponent } from '@app/shared/menu-select/faculty-select/faculty-select.component';
import { SpecialtySelectComponent } from '@app/shared/menu-select/specialty-select/specialty-select.component';
import { UniversitySelectComponent } from '@app/shared/menu-select/university-select/university-select.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IGroup } from 'src/core/interfaces/group.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-group-entity',
  templateUrl: './group-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './group-entity.component.scss'],
})
export class GroupEntityComponent implements OnInit, OnDestroy {
  @ViewChild(UniversitySelectComponent, {static: true}) univSelect: UniversitySelectComponent;
  @ViewChild(FacultySelectComponent, {static: true}) facSelect: FacultySelectComponent;
  @ViewChild(SpecialtySelectComponent, {static: true}) specSelect: SpecialtySelectComponent;
  @ViewChild(CourseSelectComponent, {static: true}) courseSelect: CourseSelectComponent;
  public groupEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    subgroups: new FormControl('', Validators.min(0)),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    univ: new FormControl(''),
    faculty: new FormControl(''),
    specialty: new FormControl(''),
    course: new FormControl(''),
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
    this.groupEntityForm.reset(value);
  }

  public ngOnInit(): void {
    this._applyFormChanges();
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

  private _applyFormChanges(): void {
    this.groupEntityForm.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .pipe(distinctUntilChanged((source, previous) => this._formatService.isObjectsSimilar(source, previous)))
      .pipe(debounceTime(0)) // for apply control value changes first
      .subscribe(({specialty, univ, faculty, course}) => {
        course = specialty ? course : undefined;
        const courseOption = this.courseSelect.getSelectedOptions() as ICourse;
        specialty = !!courseOption ? courseOption.specialty : specialty;
        const specialtyOption = this.specSelect.getSelectedOptions() as ISpecialty;
        faculty = !!specialtyOption ? specialtyOption.faculty : faculty;
        const facultyOption = this.facSelect.getSelectedOptions() as IFaculty;
        univ = !!facultyOption ? facultyOption.univ : univ;
        this.groupEntityForm.patchValue({univ, faculty, specialty, course});
      });
  }
}
