import { Component } from '@angular/core';
import { EntitiesList } from '@app/shared/classes/entities-list';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-housings-info',
  templateUrl: './housings-info.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/entities-list.scss',
    './housings-info.component.scss',
  ],
})
export class HousingsInfoComponent extends EntitiesList {
  public listTitle = 'Список корпусів';
  protected _createItemPath = ['create-housing'];
  protected _newItemChanel = PopupChanelEnum.CREATE_HOUSING;
}
