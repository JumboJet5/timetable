import { Component } from '@angular/core';
import { EntitiesList } from '@app/shared/classes/entities-list';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-teachers-info',
  templateUrl: './teachers-info.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/entities-list.scss',
    './teachers-info.component.scss',
  ],
})
export class TeachersInfoComponent extends EntitiesList {
  protected _createItemPath = ['create-teacher'];
  protected _newItemChanel = PopupChanelEnum.CREATE_TEACHER;
  public ordering = 'last_name';
}
