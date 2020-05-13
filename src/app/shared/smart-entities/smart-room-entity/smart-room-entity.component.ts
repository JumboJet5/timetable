import { Component, Input } from '@angular/core';
import { RoomEntityService } from '@app/service/room-entity/room-entity.service';
import { RoomService } from '@app/service/room/room.service';
import { IRoom } from 'src/core/interfaces/room.interface';

@Component({
  selector: 'app-smart-room-entity',
  templateUrl: './smart-room-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-room-entity.component.scss'],
  providers: [RoomEntityService],
})
export class SmartRoomEntityComponent {
  public isLoading = false;

  constructor(public roomEntityService: RoomEntityService,
              private _roomService: RoomService) { }

  private _room: IRoom;

  public get room(): IRoom {
    return this._room;
  }

  @Input()
  public set room(value: IRoom) {
    this._room = value;
    this.reset();
  }

  public save() {
    if (this.roomEntityService.form.invalid || !this.room) return;

    this.isLoading = true;
    this._roomService.updateItem(this.room.id, this.roomEntityService.form.value)
      .subscribe(res => Object.assign(this.room, res) && this.reset())
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.roomEntityService.resetForm(this.room);
  }
}
