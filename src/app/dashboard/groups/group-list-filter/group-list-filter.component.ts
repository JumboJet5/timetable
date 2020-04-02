import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { CourseSelectComponent } from '@app/shared/menu-select/course-select/course-select.component';
import { FacultySelectComponent } from '@app/shared/menu-select/faculty-select/faculty-select.component';
import { SpecialtySelectComponent } from '@app/shared/menu-select/specialty-select/specialty-select.component';
import { UniversitySelectComponent } from '@app/shared/menu-select/university-select/university-select.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-group-list-filter',
  templateUrl: './group-list-filter.component.html',
  styleUrls: ['./group-list-filter.component.scss'],
})
export class GroupListFilterComponent implements OnInit, OnDestroy {
  @ViewChild(UniversitySelectComponent, {static: true}) univSelect: UniversitySelectComponent;
  @ViewChild(FacultySelectComponent, {static: true}) facSelect: FacultySelectComponent;
  @ViewChild(SpecialtySelectComponent, {static: true}) specSelect: SpecialtySelectComponent;
  @ViewChild(CourseSelectComponent, {static: true}) courseSelect: CourseSelectComponent;
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl();
  public specControl: FormControl = new FormControl();
  public courseControl: FormControl = new FormControl();
  public filterForm: FormGroup = new FormGroup({
    univ: this.univControl,
    faculty: this.facControl,
    specialty: this.specControl,
    course: this.courseControl,
  });
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _router: Router,
              private _formatService: FormatService,
              private _route: ActivatedRoute) { }

  public ngOnInit(): void {
    this._applyFiltersChange();
    this._initFiltersValue();
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
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

  private _applyFiltersChange(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .pipe(distinctUntilChanged((source, previous) => this._formatService.isObjectsSimilar(source, previous)))
      .pipe(debounceTime(100))
      .subscribe(({univ, faculty, specialty, course}) => {
        if (!!course) return this._router.navigate(['dashboard', 'groups'], {queryParams: {course}});
        if (!!specialty) return this._router.navigate(['dashboard', 'groups'], {queryParams: {specialty}});
        if (!!faculty) return this._router.navigate(['dashboard', 'groups'], {queryParams: {faculty}});
        if (!!univ) return this._router.navigate(['dashboard', 'groups'], {queryParams: {univ}});
        return this._router.navigate(['dashboard', 'groups']);
      });
  }

  private _initFiltersValue(): void {
    const primaryRoute = this._route.parent.children.find(child => child.outlet === 'primary');
    if (!primaryRoute) return;

    this._patchValueFromRoute(primaryRoute.snapshot.queryParams);
    primaryRoute.queryParams
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this._patchValueFromRoute(value));
  }

  private _patchValueFromRoute(params: Params): void {
    const patchValue = {};
    Object.keys(params).forEach(key => patchValue[key] = +params[key]);
    this.filterForm.reset(patchValue);
  }
}
