import { Observable } from 'rxjs';
import { IPageable } from './pageable.interface';
import { IRequestParams } from './request-param/request-param.interface';

export interface IWithId {
  id: number;
  [key: string]: any;
}

export interface IOptionService<T> {
  getOptions(params: IRequestParams): Observable<IPageable<T>>;
  getOption(id: number): Observable<T>;
}
