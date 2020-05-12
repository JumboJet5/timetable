import { Component } from '@angular/core';
import { EntitiesList } from '@app/shared/classes/entities-list';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-groups-info',
  templateUrl: './groups-info.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/entities-list.scss',
    './groups-info.component.scss',
  ],
})
export class GroupsInfoComponent extends EntitiesList {
  public listTitle = 'Список груп';
  protected _createItemPath = ['create-group'];
  protected _newItemChanel = PopupChanelEnum.CREATE_GROUP;
}
