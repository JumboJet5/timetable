import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultySelectComponent } from '@app/shared/menu-select/faculty-select/faculty-select.component';
import { SpecialtySelectComponent } from '@app/shared/menu-select/specialty-select/specialty-select.component';
import { UniversitySelectComponent } from '@app/shared/menu-select/university-select/university-select.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-group-list-filter',
  templateUrl: './group-list-filter.component.html',
  styleUrls: ['./group-list-filter.component.scss'],
})
export class GroupListFilterComponent implements OnInit, OnDestroy {
  @ViewChild(UniversitySelectComponent, {static: true}) univSelect: UniversitySelectComponent;
  @ViewChild(FacultySelectComponent, {static: true}) facSelect: FacultySelectComponent;
  @ViewChild(SpecialtySelectComponent, {static: true}) specSelect: SpecialtySelectComponent;
  public univControl: FormControl = new FormControl('');
  public facControl: FormControl = new FormControl('');
  public specControl: FormControl = new FormControl('');
  public filterForm: FormGroup = new FormGroup({univ: this.univControl, faculty: this.facControl, specialty: this.specControl});
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _router: Router,
              private _route: ActivatedRoute) { }

  public ngOnInit(): void {
    this._applyFiltersChange();
    this._observeUniversity();
    this._observeFaculty();
    this._observeSpecialty();
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
      .subscribe(value => {
        const filters = [value.univ || 'any', value.faculty || 'any', value.specialty || 'any'];
        this._router.navigate(['dashboard', 'groups', ...filters]);
      });
  }

  private _observeUniversity(): void {
    this.univControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this._autoResetFaculty(true);
        this._autoResetSpecialty(true);
      });
  }

  private _observeFaculty(): void {
    this.facControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this._autoResetFaculty();
        this._autoResetSpecialty(true);
      });
  }

  private _observeSpecialty(): void {
    this.specControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this._autoResetSpecialty());
  }

  private _initFiltersValue(): void {
    const primaryRoute = this._route.parent.children.find(child => child.outlet === 'primary');
    if (!primaryRoute) return;

    this._patchValueFromRoute(primaryRoute.snapshot.params);
    primaryRoute.params
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this._patchValueFromRoute(value));
  }

  private _autoResetFaculty(dropping: boolean = false): void {
    const fac = this.facSelect.getOptionById(this.facControl.value);
    if (!fac || fac.univ === this.univControl.value) return;

    if (dropping) this.facControl.patchValue('', {onlySelf: true});
    else this.univControl.patchValue(fac.univ, {onlySelf: true});
  }

  private _autoResetSpecialty(dropping: boolean = false): void {
    const spec = this.specSelect.getOptionById(this.specControl.value);
    if (!spec || spec.faculty === this.facControl.value) return;

    if (dropping) this.specControl.patchValue('', {onlySelf: true});
    else this.facControl.patchValue(spec.faculty, {onlySelf: true});
  }

  private _patchValueFromRoute(value: any): void {
    Object.keys(value).forEach(key => {
      const patchValue = value[key] === 'any' ? '' : +value[key];
      if (this.filterForm.get(key) && this.filterForm.get(key).value !== patchValue)
        this.filterForm.get(key).patchValue(patchValue, {onlySelf: true});
    });
  }
}
