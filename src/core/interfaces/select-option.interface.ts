import { Observable } from 'rxjs';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import { IPageable } from './pageable.interface';

export interface IWithId {
  id: number;
  slug?: string;

  [key: string]: any;
}

export interface IOptionService<T> {
  getOptions(params: IRequestParams): Observable<IPageable<T>>;

  getOption(id: number | string): Observable<T>;
}

export interface IItemsService<T> {
  getItems(params: IRequestParams): Observable<IPageable<T>>;
  deleteItem(id: number): Observable<null>;
}
