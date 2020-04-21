import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';

@Component({
  selector: 'app-specialties-info',
  templateUrl: './specialties-info.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './specialties-info.component.scss'],
})
export class SpecialtiesInfoComponent implements OnInit, OnDestroy {
  public searchControl: FormControl = new FormControl('');
  public ordering = 'name';
  public filters: IFilterParams = {};
  private _searchValue = '';
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _specialtyService: SpecialtyService,
              private _popupService: PopupService,
              private _route: ActivatedRoute) { }

  public ngOnInit(): void {
    this._route.queryParams
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((value: Params) => this.filters = {ordering: this.ordering, search: this._searchValue, ...(value || {})});

    this._popupService.getChanel(PopupChanelEnum.CREATE_SPECIALTY)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.filters = {...this.filters});

    this.searchControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this._searchValue = value;
        this.filters = {ordering: this.ordering, search: this._searchValue, ...(value || {})};
      });
  }

  public createSpecialty() {
    this._popupService.openReactiveModal(['create-specialty'], {...this.filters});
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
