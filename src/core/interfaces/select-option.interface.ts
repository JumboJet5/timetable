import { Observable } from 'rxjs';
import { IPageable } from './pageable.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';

export interface IWithId {
  id: number;
  slug?: string;
  [key: string]: any;
}

export interface IOptionService<T> {
  getOptions(params: IRequestParams): Observable<IPageable<T>>;
  getOption(id: number | string): Observable<T>;
}
