import { Component, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filterAppearAnimation } from '@animations/appear.animation';
import { FormatService } from '@app/service/format/format.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IFilterConfig } from 'src/core/interfaces/filter-config.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-structure-filter',
  templateUrl: './structure-filters.component.html',
  styleUrls: ['./structure-filters.component.scss'],
  animations: [filterAppearAnimation],
})
export class StructureFiltersComponent implements OnInit, OnDestroy {
  @Input() public withFaculty = false;
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
  public isOpened = true;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _router: Router,
              private _formatService: FormatService,
              @Inject(FILTER_CONFIG)  public filterConfig: IFilterConfig,
              private _route: ActivatedRoute) { }

  private _withCourse = false;

  public get withCourse(): boolean {
    return this._withCourse;
  }

  @Input()
  public set withCourse(value: boolean) {
    this._withCourse = value;
    if (value) this.withSpecialty = true;
  }

  private _withSpecialty = false;

  public get withSpecialty(): boolean {
    return this._withSpecialty;
  }

  @Input()
  public set withSpecialty(value: boolean) {
    this._withSpecialty = value;
    if (value) this.withFaculty = true;
  }

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
        if (!!course) return this._router.navigate([], {queryParams: {course}});
        if (!!specialty) return this._router.navigate([], {queryParams: {specialty}});
        if (!!faculty) return this._router.navigate([], {queryParams: {faculty}});
        if (!!univ) return this._router.navigate([], {queryParams: {univ}});
        return this._router.navigate([]);
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
