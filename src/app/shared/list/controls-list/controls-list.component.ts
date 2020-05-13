import { Component, Input, Optional } from '@angular/core';
import { ControlService } from '@app/service/control/control.service';
import { PopupService } from '@app/service/modal/popup.service';
import { RoomService } from '@app/service/room/room.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { TeacherService } from '@app/service/teacher/teacher.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { controlTypesMap } from '@const/collections';
import { IControl } from 'src/core/interfaces/control.interface';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IHousing } from 'src/core/interfaces/housing.interface';
import { IRoom } from 'src/core/interfaces/room.interface';
import { ITeacher } from 'src/core/interfaces/teacher.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-controls-list',
  templateUrl: './controls-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './controls-list.component.scss'],
})
export class ControlsListComponent extends ItemsListComponent<IControl> {
  public emptyListMessage = 'Список контролів пустий';
  public themesMap: Map<number, ITheme> = new Map<number, ITheme>();
  public housingsMap: Map<number, IHousing> = new Map<number, IHousing>();
  public teachersMap: Map<number, ITeacher> = new Map<number, ITeacher>();
  public roomsMap: Map<number, IRoom> = new Map<number, IRoom>();
  public formatTypesMap = controlTypesMap();

  constructor(private _controlService: ControlService,
              private _teacherService: TeacherService,
              private _roomService: RoomService,
              protected _popupService: PopupService,
              @Optional() public smartDetailsService: SmartDetailsService) {
    super(itemServiceFactory<IControl>(params => this._controlService.getItems(params),
      id => this._controlService.deleteItem(id)), _popupService, smartDetailsService);
  }

  @Input()
  public set themes(value: ITheme[]) {
    this.themesMap.clear();
    if (!!value) value.forEach(theme => this.themesMap.set(theme.id, theme));
  }

  @Input()
  public set housings(value: IHousing[]) {
    this.housingsMap.clear();
    if (!!value) value.forEach(housing => this.housingsMap.set(housing.id, housing));
  }

  public getItemDetailsEntity(entity: IControl): void {
    if (!!this.smartDetailsService) this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.CONTROL};
  }

  public getTeacher(teacherId: number): ITeacher {
    if (this.teachersMap.has(teacherId)) return this.teachersMap.get(teacherId);

    this.teachersMap.set(teacherId, undefined);
    this._teacherService.getItem(teacherId)
      .subscribe(teacher => this.teachersMap.set(teacherId, teacher));
  }

  public getRoom(roomId: number): IRoom {
    if (this.roomsMap.has(roomId)) return this.roomsMap.get(roomId);

    this.roomsMap.set(roomId, undefined);
    this._roomService.getItem(roomId)
      .subscribe(room => this.roomsMap.set(roomId, room));
  }
}
