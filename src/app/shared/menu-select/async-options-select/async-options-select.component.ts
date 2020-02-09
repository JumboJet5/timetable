import { HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { IFilterParams, IOptionService, IPageable, IPaginationParams, IRequestParams, IWithId } from '@interfaces';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectComponent } from '../../select-input/select/select.component';


export function optionServiceFactory<T>(getOption: (id: number) => Observable<T>,
                                        getOptions: (params: IRequestParams) => Observable<IPageable<T>>): IOptionService<T> {
  return {getOption, getOptions};
}

export class AsyncOptionsSelectComponent<TOption extends IWithId> implements OnInit, OnDestroy {
  @ViewChild(SelectComponent) public selectComponent: SelectComponent;
  @Input() public selectControl: AbstractControl;
  @Input() public multiple: boolean;
  @Input() public disabled = false;
  public options: TOption[] = [];
  public isLoading = false;
  public simplePlaceholder = 'Оберіть значення';
  public multiplePlaceholder = 'Оберіть значення';
  public withSearch = false;
  public filterForm: FormGroup = this.formBuilder.group({search: ''});
  private _optionIdsMap: Map<number, TOption> = new Map<number, TOption>();
  private _paginationFilters: IPaginationParams = {offset: 0, limit: 20};
  private _isLast = false;
  private _destroyUnsubscribe$: Subject<void> = new Subject();
  private _pageUnsubscribe$: Subject<void> = new Subject();

  constructor(public optionService: IOptionService<TOption>,
              protected formBuilder: FormBuilder) {}

  private _filters: IFilterParams;

  @Input()
  public set filters(value: IFilterParams) {
    if (value !== this._filters) {
      this._filters = value;
      this._applyFilters();
    }
  }

  public ngOnInit() {
    if (!this._filters) this._applyFilters();
    this._applyControlChanges();

    this.selectControl.valueChanges
      .pipe(takeUntil(this._destroyUnsubscribe$))
      .subscribe(() => this._applyControlChanges());

    this.filterForm.valueChanges
      .pipe(takeUntil(this._destroyUnsubscribe$))
      .subscribe(() => this._applyFilters());
  }

  public getOptionById(id: number): TOption {
    return this._optionIdsMap.get(id);
  }

  public onViewportAction(event: { visible: boolean }) {
    if (event && event.visible) this._loadOptions();
  }

  public onClose(): void {
    if (this.filterForm.value.search) return this.filterForm.patchValue({search: ''});

    this.options.sort((first, second) => this._comparator(first, second));
  }

  public getOptionText(id: number) {
    return this._optionIdsMap.has(id) ? this._optionIdsMap.get(id).name : '';
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._destroyUnsubscribe$.next();
    this._destroyUnsubscribe$.complete();
    this._pageUnsubscribe$.next();
    this._pageUnsubscribe$.complete();
  }

  private _loadOptions(): void {
    if (!this.isLoading && !this._isLast) {
      this.isLoading = true;
      this.optionService.getOptions({...this.filterForm.value, ...this._paginationFilters, ...this._filters})
        .pipe(takeUntil(this._pageUnsubscribe$))
        .subscribe(res => {
          res.results.forEach(item => this._addOptionToList(item));
          this._paginationFilters.offset += this._paginationFilters.limit;
          this._isLast = res.count === this.options.length;
        })
        .add(() => this.isLoading = false);
    }
  }

  private _loadOption(id: number): void {
    if (id || id === 0) this.optionService.getOption(id)
      .pipe(takeUntil(this._destroyUnsubscribe$))
      .subscribe(group => this._addOptionToList(group, true));
  }

  private _addOptionToList(option: TOption, toHead: boolean = false): void {
    if (!this._optionIdsMap.has(option.id)) toHead ? this.options.unshift(option) : this.options.push(option);
    this._optionIdsMap.set(option.id, option);
  }

  private _comparator(first: TOption, second: TOption): number {
    const selected = this.selectControl.value;
    const isFirstSelected = this.multiple ? !selected.includes(first.id) : first.id !== selected;
    const isSecondSelected = this.multiple ? !selected.includes(second.id) : second.id !== selected;
    const equal = isFirstSelected === isSecondSelected;
    return equal ? 0 : isFirstSelected ? 1 : -1;
  }

  private _applyFilters(): void {
    this.options = [];
    this.isLoading = false;
    this._isLast = false;
    this._optionIdsMap = new Map<number, TOption>();
    this._paginationFilters.offset = 0;
    this._pageUnsubscribe$.next();
    this._loadOptions();
  }

  private _applyControlChanges() {
    if (this.multiple) (this.selectControl.value || []).forEach(id => this._addToOptions(id));
    else this._addToOptions(this.selectControl.value);
  }

  private _addToOptions(id: number) {
    if (!this._optionIdsMap.has(id)) this._loadOption(id);
  }
}
