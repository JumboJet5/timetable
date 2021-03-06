import { Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { AsyncOptionsSelectComponent } from '@app/shared/menu-select/async-options-select/async-options-select.component';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IFilterParams, IRequestParams } from 'src/core/interfaces/request-param.interface';
import { IOptionService, IWithId } from 'src/core/interfaces/select-option.interface';


export class AsyncSelectorWithFiltersComponent<TOption extends IWithId> extends AsyncOptionsSelectComponent<TOption> implements OnInit {
  @Input() public dropByFilter = false;
  @Input() public dropByFilterKeys: string[] = [];
  @Input() public dropByFilterDefinition = true;

  constructor(public optionService: IOptionService<TOption>,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionService, formBuilder);
  }

  private _filters: IFilterParams;

  @Input()
  public set filters(filters: IFilterParams) {
    if (!this.formatService.isObjectsSimilar(this._filters, filters)) {
      Object.entries(filters).forEach(([key, value]) => !value && value !== 0 && (filters[key] = ''));

      this._needDropValueByNewFilters(filters);

      this._filters = filters;
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

  protected _getPageParams(): IRequestParams {
    return {...this.searchForm.value, ...this._paginationFilters, ...this._filters};
  }

  private _needDropValueByNewFilters(newFilters: IFilterParams): void {
    if (!!this.selectControl && this.dropByFilter) this.selectControl.patchValue(undefined);
    if (!this.selectControl) return;

    if (this.multiple) {
      const newValue = (this.getSelectedOptions() || [])
        .filter(value => this._isObjectPassFilters(value, newFilters));

      this.selectControl.patchValue(newValue);
    } else if (this._isObjectPassFilters(this.getSelectedOption(), newFilters))
      this.selectControl.patchValue(undefined);
  }

  private _isObjectPassFilters(option: TOption, newFilters: IFilterParams): boolean {
    const difference = this.formatService.getObjectsKeyWithDifference(this._filters, newFilters);

    return !!option && !!this.dropByFilterKeys && (this.dropByFilterKeys || [])
      .some(key => difference.includes(key) && (this.dropByFilterDefinition || !!this._filters[key])
        && (!option[key] || option[key] !== newFilters[key]));
  }
}
