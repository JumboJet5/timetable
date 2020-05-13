import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { Observable } from 'rxjs';


@Injectable()
export class EntityWithImageCrudService<TItem extends {img: string | File}> extends EntityCrudService<TItem> {
  constructor(protected http: HttpClient,
              protected formatService: FormatService) {
    super(http);
  }

  public createItem(item: TItem): Observable<TItem> {
    return this.http.post<TItem>(this._itemsURL, this.formatService.getFormDataFromObject(item));
  }

  public updateItem(id: number, item: TItem): Observable<TItem> {
    const body = this.formatService.getFormDataFromObject(item);
    if (typeof item.img === 'string') body.delete('img');
    return this.http.put<TItem>(this._itemURL(id), body);
  }
}
