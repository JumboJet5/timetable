import { Input, OnInit, Optional } from '@angular/core';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IFilterParams, IPaginationParams, IRequestParams } from 'src/core/interfaces/request-param.interface';
import { IItemsService, IWithId } from 'src/core/interfaces/select-option.interface';


export function itemServiceFactory<T>(getItems: (params: IRequestParams) => Observable<IPageable<T>>,
                                      deleteItem: (id: number) => Observable<null>): IItemsService<T> {
  return {getItems, deleteItem};
}

export abstract class ItemsListComponent<IItem extends IWithId> implements OnInit {
  @Input() withDeleting = true;
  @Input() withDetails = false;
  @Input() deleteDialogHeader = 'Вилучити елемент?';
  @Input() deleteDialogBody = 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?';
  public isLoading = false;
  public items: IItem[] = [];
  private _paginationParams: IPaginationParams = {offset: 0, limit: 20};
  private _isLastLoaded = false;

  protected constructor(private _itemsService: IItemsService<IItem>,
                        protected _popupService: PopupService,
                        @Optional() public smartDetailsService: SmartDetailsService) { }

  private _filters: IFilterParams;

  public get filters(): IFilterParams {
    return this._filters;
  }

  @Input()
  public set filters(value: IFilterParams) {
    this._filters = value;
    this._paginationParams.offset = 0;
    this.items = [];
    this._isLastLoaded = false;
    this.loadItems();
  }

  public ngOnInit(): void {
    this.loadItems();
  }

  public loadItems(): void {
    if (this._isLastLoaded || this.isLoading) return;

    this.isLoading = true;
    this._itemsService.getItems({...this.filters, ...this._paginationParams})
      .pipe(tap(res => this._isLastLoaded = !res.next))
      .subscribe(res => this.items.push(...res.results))
      .add(() => this.isLoading = false);

    this._paginationParams.offset += this._paginationParams.limit;
  }

  public deleteItem(index: number): void {
    if (!this.items || !this.items[index]) return;

    this._popupService.openDialog({
        header: this.deleteDialogHeader,
        body: this.deleteDialogBody,
      },
      () => this._itemsService.deleteItem(this.items[index].id)
        .subscribe(() => this.filters = {...this.filters}));
  }

  public abstract getItemDetailsEntity(entity: IItem): void;
}
