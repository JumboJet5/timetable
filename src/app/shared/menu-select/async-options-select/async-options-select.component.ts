import { ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { IFilterParams, IOptionService, IPageable, IPaginationParams, IRequestParams, IWithId } from '@interfaces';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SelectComponent } from '../../select-input/select/select.component';


export function optionServiceFactory<T>(getOption: (id: number) => Observable<T>,
                                        getOptions: (params: IRequestParams) => Observable<IPageable<T>>): IOptionService<T> {
  return {getOption, getOptions};
}

export class AsyncOptionsSelectComponent<TOption extends IWithId> implements OnInit, OnDestroy {
  @ViewChild(SelectComponent) public selectComponent: SelectComponent;
  @ViewChild('searchInput') public searchInput: ElementRef<HTMLInputElement>;
  @Input() public selectControl: AbstractControl;
  @Input() public multiple: boolean;
  @Input() public disabled = false;
  @Input() public optionIdKey: keyof TOption = 'id';
  @Input() public dropByFilter = false;
  public options: TOption[] = [];
  public isLoading = false;
  public simplePlaceholder = 'Оберіть значення';
  public multiplePlaceholder = 'Оберіть значення';
  public withSearch = false;
  public searchForm: FormGroup = this.formBuilder.group({search: ''});
  private _optionIdsMap: Map<number | string, TOption> = new Map<number, TOption>();
  private _paginationFilters: IPaginationParams = {offset: 0, limit: 20};
  private _isLast = false;
  private _destroyUnsubscribe$: Subject<void> = new Subject();
  private _pageUnsubscribe$: Subject<void> = new Subject();

  constructor(public optionService: IOptionService<TOption>,
              protected formBuilder: FormBuilder) {}

  private _filters: IFilterParams;

  @Input()
  public set filters(filters: IFilterParams) {
    if (filters !== this._filters) {
      this._filters = filters;

      const currOption = this.getSelectedOptions();
      if (this.dropByFilter && !!currOption
        && Object.entries(filters).some(([key, value]) => (!!value || value === 0) && value !== currOption[key]))
        this.selectControl.patchValue(undefined);

      Object.entries(filters).forEach(([key, value]) => !value && value !== 0 && (filters[key] = ''));
      this._applyFilters();
    }
  }

  public ngOnInit() {
    if (!this._filters) this._applyFilters();
    this._applyControlChanges();

    this.selectControl.valueChanges
      .pipe(takeUntil(this._destroyUnsubscribe$))
      .subscribe(() => this._applyControlChanges());

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .pipe(takeUntil(this._destroyUnsubscribe$))
      .subscribe(() => this._applyFilters());
  }

  public getOptionById(id: number | string): TOption {
    return this._optionIdsMap.get(id);
  }

  public getSelectedOptions(): TOption | TOption[] {
    if (!this.selectControl) return null;

    return this.multiple ? (this.selectControl.value || []).map(id => this.getOptionById(id))
      : this.getOptionById(this.selectControl.value);
  }

  public onViewportAction(event: { visible: boolean }) {
    if (event && event.visible) this._loadOptions();
  }

  public onOpen() {
    setTimeout(() => this.withSearch && !!this.searchInput && this.searchInput.nativeElement.focus());
  }

  public onClose(): void {
    if (this.searchForm.value.search) return this.searchForm.patchValue({search: ''});
    this._sortOptions();
  }

  public getOptionText(id: number | string) {
    return this._optionIdsMap.has(id) ? this._optionIdsMap.get(id).name : '';
  }

  public getOptionTitleText(id: number | string) {
    return this.getOptionText(id);
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
      this.optionService.getOptions({...this.searchForm.value, ...this._paginationFilters, ...this._filters})
        .pipe(takeUntil(this._pageUnsubscribe$))
        .subscribe(res => {
          res.results.forEach(item => this._addOptionToList(item));
          this._sortOptions();
          this.selectComponent.initActive();
          this._paginationFilters.offset += this._paginationFilters.limit;
          this._isLast = res.count === this.options.length;
        })
        .add(() => this.isLoading = false);
    }
  }

  private _loadOption(id: number | string): void {
    if (id || id === 0) this.optionService.getOption(id)
      .pipe(takeUntil(this._destroyUnsubscribe$))
      .subscribe(group => this._addOptionToList(group, true));
  }

  private _addOptionToList(option: TOption, toHead: boolean = false): void {
    if (!!option && !this.options.find(item => item[this.optionIdKey] === option[this.optionIdKey]))
      if (toHead) {
        this.options.unshift(option);
        this.selectComponent.initActive();
      } else this.options.push(option);
    this._optionIdsMap.set(option[this.optionIdKey], option);
  }

  private _comparator(first: TOption, second: TOption): number {
    const selected = this.selectControl.value;
    const isFirstSelected = this.multiple ? !selected.includes(first[this.optionIdKey]) : first[this.optionIdKey] !== selected;
    const isSecondSelected = this.multiple ? !selected.includes(second[this.optionIdKey]) : second[this.optionIdKey] !== selected;
    const equal = isFirstSelected === isSecondSelected;
    return equal ? 0 : isFirstSelected ? 1 : -1;
  }

  private _applyFilters(): void {
    this.options = [];
    this.isLoading = false;
    this._isLast = false;
    const tempMap = new Map<number, TOption>();
    if (this.selectControl && (this.selectControl.value || this.selectControl.value === 0)) {
      if (this.multiple && this.selectControl.value instanceof Array) this.selectControl.value
        .forEach(option => this._optionIdsMap.has(option) ? tempMap.set(option, this._optionIdsMap.get(option)) : null);
      if (!this.multiple && this._optionIdsMap.has(this.selectControl.value))
        tempMap.set(this.selectControl.value, this._optionIdsMap.get(this.selectControl.value));
    }
    this._optionIdsMap = tempMap;
    this._paginationFilters.offset = 0;
    this._pageUnsubscribe$.next();
    this._loadOptions();
  }

  private _applyControlChanges() {
    if (this.multiple) (this.selectControl.value || []).forEach(id => this._addToOptions(id));
    else this._addToOptions(this.selectControl.value);
  }

  private _addToOptions(id: number | string) {
    if (!this._optionIdsMap.has(id)) this._loadOption(id);
  }

  private _sortOptions(): void {
    this.options.sort((first, second) => this._comparator(first, second));
  }
}
