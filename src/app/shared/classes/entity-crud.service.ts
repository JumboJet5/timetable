import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageable } from 'src/core/interfaces/pageable.interface';
import { IFilterParams, IRequestParams } from 'src/core/interfaces/request-param.interface';


@Injectable()
export class EntityCrudService<TItem extends object> {
  protected _itemsURL: string;
  protected _itemURL: (id: number) => string;

  constructor(protected http: HttpClient) {}

  public getItems(params: IRequestParams): Observable<IPageable<TItem>> {
    return this.http.get<IPageable<TItem>>(this._itemsURL, {params: params as {}});
  }

  public getAllItems(params: IFilterParams): Observable<IPageable<TItem>> {
    return this.http.get<IPageable<TItem>>(this._itemsURL, {params: params as {}});
  }

  public getItem(id: number): Observable<TItem> {
    return this.http.get<TItem>(this._itemURL(id));
  }

  public createItem(item: Partial<TItem>): Observable<TItem> { // todo define entity form service value type
    return this.http.post<TItem>(this._itemsURL, item);
  }

  public updateItem(id: number, item: Partial<TItem>): Observable<TItem> {
    return this.http.put<TItem>(this._itemURL(id), item);
  }

  public deleteItem(id: number): Observable<null> {
    return this.http.delete<null>(this._itemURL(id));
  }
}
