import { Component } from '@angular/core';
import { EntitiesList } from '@app/shared/classes/entities-list';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: [
    '../../../core/stylesheet/default-form.scss',
    '../../../core/stylesheet/entities-list.scss',
    './universities.component.scss',
  ],
})
export class UniversitiesComponent extends EntitiesList {
  public listTitle = 'Список університетів';
  protected _createItemPath = ['create-university'];
  protected _withFilters = false;
  protected _newItemChanel = PopupChanelEnum.CREATE_UNIVERSITY;
}
