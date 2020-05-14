import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { RoomEntityService } from '@app/service/room-entity/room-entity.service';
import { RoomService } from '@app/service/room/room.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IRoom } from 'src/core/interfaces/room.interface';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-room.component.scss'],
  providers: [RoomEntityService],
})
export class CreateRoomComponent extends CreateEntityModal<IRoom> {
  protected _chanelId: number = PopupChanelEnum.CREATE_ROOM;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _roomService: RoomService,
              public roomEntityService: RoomEntityService) {
    super(_route, _router, _popupService, _roomService, roomEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.roomEntityService.resetForm({housing: +params.housing});
  }
}
