import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { RoomEntityService } from '@app/service/room-entity/room-entity.service';
import { RoomService } from '@app/service/room/room.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-room.component.scss'],
  providers: [RoomEntityService],
})
export class CreateRoomComponent implements OnInit {
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_ROOM;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public roomEntityService: RoomEntityService,
              private roomService: RoomService,
              private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.route.queryParams
      .subscribe(() => this._applyQueryParams());
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public create() {
    if (this.roomEntityService.form.invalid) return;

    this.isLoading = true;
    this.roomService.createRoom(this.roomEntityService.getFormValue())
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  private _applyQueryParams() {
    this.roomEntityService.resetForm({housing: +this.route.snapshot.queryParams.housing});
  }
}
