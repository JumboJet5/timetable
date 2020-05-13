import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { Observable } from 'rxjs';
import { IGroup } from 'src/core/interfaces/group.interface';
import { GROUP, GROUPS } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class GroupService extends EntityCrudService<IGroup> {
  protected _itemsURL = GROUPS;
  protected _itemURL = GROUP;

  public getItem(id: number | string): Observable<IGroup> {
    return this.http.get<IGroup>(this._itemURL(id));
  }
}
