import { Component, Optional } from '@angular/core';
import { PopupService } from '@app/service/modal/popup.service';
import { RoomService } from '@app/service/room/room.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { IRoom } from 'src/core/interfaces/room.interface';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './rooms-list.component.scss'],
})
export class RoomsListComponent extends ItemsListComponent<IRoom> {
  protected _filters: IFilterParams = {ordering: 'num'};
  public emptyListMessage = 'Список аудиторій пустий';

  constructor(private _roomService: RoomService,
              protected _popupService: PopupService,
              @Optional() public smartDetailsService: SmartDetailsService) {
    super(itemServiceFactory<IRoom>(params => this._roomService.getItems(params),
      id => this._roomService.deleteItem(id)), _popupService, smartDetailsService);
  }

  public getItemDetailsEntity(entity: IRoom): void {
    if (!!this.smartDetailsService) this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.ROOM};
  }
}
