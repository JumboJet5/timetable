import { HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';

export class EntitiesList implements OnInit, OnDestroy {
  public searchControl: FormControl = new FormControl('');
  public ordering = 'name';
  public filters: IFilterParams = {ordering: this.ordering, search: ''};
  protected _createItemPath: (string | number)[] = [];
  protected _withSearch = true;
  protected _withCreationNewItems = true;
  protected _withFilters = true;
  protected _newItemChanel: number;
  private _searchValue = '';
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _popupService: PopupService,
              private _route: ActivatedRoute) { }

  public ngOnInit(): void {
    this._listenCreationNewItems();
    this._listenQueryParamsFilters();
    this._listenSearch();
  }

  public createNewInstance() {
    this._popupService.openReactiveModal(this._createItemPath, {...this.filters});
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _listenSearch(): void {
    if (!this._withSearch) return;

    this.searchControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this._searchValue = value;
        this.filters = {ordering: this.ordering, search: this._searchValue, ...(value || {})};
      });
  }

  private _listenCreationNewItems(): void {
    if (!this._withCreationNewItems) return;

    this._popupService.getChanel(this._newItemChanel)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.filters = {...this.filters});
  }

  private _listenQueryParamsFilters(): void {
    if (!this._withFilters) return;

    this._route.queryParams
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((value: Params) => this.filters = {ordering: this.ordering, search: this._searchValue, ...(value || {})});
  }
}
