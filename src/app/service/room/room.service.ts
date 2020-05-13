import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { IRoom } from 'src/core/interfaces/room.interface';
import { ROOM, ROOMS } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class RoomService extends EntityCrudService<IRoom> {
  protected _itemsURL = ROOMS;
  protected _itemURL = ROOM;

  constructor(protected http: HttpClient) {
    super(http);
  }
}
