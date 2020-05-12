import { Component } from '@angular/core';
import { EntitiesList } from '@app/shared/classes/entities-list';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-faculties-info',
  templateUrl: './faculties-info.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/entities-list.scss',
    './faculties-info.component.scss',
  ],
})
export class FacultiesInfoComponent extends EntitiesList {
  public listTitle = 'Список факультетів';
  protected _createItemPath = ['create-faculty'];
  protected _newItemChanel = PopupChanelEnum.CREATE_FACULTY;
}
