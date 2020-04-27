import { ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { IOptionService, IPageable, IPaginationParams, IRequestParams, IWithId } from '@interfaces';
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
  @Output() public selectedOptionLoad: EventEmitter<TOption> = new EventEmitter();
  @Input() public selectControl: AbstractControl;
  @Input() public multiple = false;
  @Input() public disabled = false;
  @Input() public readonly = false;
  @Input() public optionIdKey: keyof TOption = 'id';
  public options: TOption[] = [];
  public isLoading = false;
  public simplePlaceholder = 'Оберіть значення';
  public multiplePlaceholder = 'Оберіть значення';
  public withSearch = false;
  public searchForm: FormGroup = this.formBuilder.group({search: ''});
  protected _optionIdsMap: Map<number | string, TOption> = new Map<number, TOption>();
  protected _paginationFilters: IPaginationParams = {offset: 0, limit: 20};
  protected _isLast = false;
  protected _destroyUnsubscribe$: Subject<void> = new Subject();
  protected _pageUnsubscribe$: Subject<void> = new Subject();

  constructor(public optionService: IOptionService<TOption>,
              protected formBuilder: FormBuilder) {}

  public ngOnInit() {
    this._applyFilters();
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

  public getSelectedOption(): TOption {
    if (!this.selectControl) return null;

    if (this.multiple) throw new Error('AsyncSelector is multiple');

    return this.getOptionById(this.selectControl.value);
  }

  public getSelectedOptions(): TOption[] {
    if (!this.selectControl) return null;

    if (!this.multiple) throw new Error('AsyncSelector is not multiple');

    return (this.selectControl.value || []).map(id => this.getOptionById(id));
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

  protected _applyFilters(): void {
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

  protected _getPageParams(): IRequestParams {
    return {...this.searchForm.value, ...this._paginationFilters};
  }

  protected _applyControlChanges() {
    if (this.multiple) (this.selectControl.value || []).forEach(id => this._addToOptions(id));
    else this._addToOptions(this.selectControl.value);
  }

  private _loadOptions(): void {
    if (!this.isLoading && !this._isLast) {
      this.isLoading = true;
      this.optionService.getOptions(this._getPageParams())
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
      .subscribe(option => {
        this._addOptionToList(option, true);
        this.selectedOptionLoad.emit(option);
      });
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

  private _addToOptions(id: number | string) {
    if (!this._optionIdsMap.has(id)) this._loadOption(id);
    else this.selectedOptionLoad.emit(this.getOptionById(id));
  }

  private _sortOptions(): void {
    this.options.sort((first, second) => this._comparator(first, second));
  }
}
