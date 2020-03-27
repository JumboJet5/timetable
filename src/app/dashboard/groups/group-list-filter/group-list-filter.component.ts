import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { CourseSelectComponent } from '@app/shared/menu-select/course-select/course-select.component';
import { FacultySelectComponent } from '@app/shared/menu-select/faculty-select/faculty-select.component';
import { SpecialtySelectComponent } from '@app/shared/menu-select/specialty-select/specialty-select.component';
import { UniversitySelectComponent } from '@app/shared/menu-select/university-select/university-select.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
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
  public univControl: FormControl = new FormControl('');
  public facControl: FormControl = new FormControl('');
  public specControl: FormControl = new FormControl('');
  public courseControl: FormControl = new FormControl('');
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

  private _applyFiltersChange(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .pipe(distinctUntilChanged((source, previous) => this._formatService.isObjectsSimilar(source, previous)))
      .pipe(debounceTime(100))
      .subscribe(({specialty, univ, faculty, course}) => {
        const specialtyOption = this.specSelect.getSelectedOptions() as ISpecialty;
        faculty = !!specialtyOption ? specialtyOption.faculty : faculty;
        const facultyOption = this.facSelect.getSelectedOptions() as IFaculty;
        univ = !!facultyOption ? facultyOption.univ : univ;
        course = specialty ? course : undefined;
        this.filterForm.patchValue({univ, faculty, course});
        const filters = [univ || 'any', faculty || 'any', specialty || 'any', course || 'any'];
        this._router.navigate(['dashboard', 'groups', ...filters]);
      });
  }

  private _initFiltersValue(): void {
    const primaryRoute = this._route.parent.children.find(child => child.outlet === 'primary');
    if (!primaryRoute) return;

    this._patchValueFromRoute(primaryRoute.snapshot.params);
    primaryRoute.params
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this._patchValueFromRoute(value));
  }

  private _patchValueFromRoute(value: any): void {
    Object.keys(value).forEach(key => {
      const patchValue = value[key] === 'any' ? '' : +value[key];
      if (this.filterForm.get(key) && this.filterForm.get(key).value !== patchValue)
        this.filterForm.get(key).patchValue(patchValue, {onlySelf: true});
    });
  }
}
