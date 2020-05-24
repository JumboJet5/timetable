import { Component } from '@angular/core';
import { RoomEntityService } from '@app/service/room-entity/room-entity.service';
import { RoomService } from '@app/service/room/room.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { IRoom } from 'src/core/interfaces/room.interface';

@Component({
  selector: 'app-smart-room-entity',
  templateUrl: './smart-room-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-room-entity.component.scss'],
  providers: [RoomEntityService],
})
export class SmartRoomEntityComponent extends SmartItemEntity<IRoom> {
  constructor(protected _roomService: RoomService,
              public roomEntityService: RoomEntityService) {
    super(_roomService, roomEntityService);
  }
}
