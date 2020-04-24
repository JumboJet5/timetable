import { Component } from '@angular/core';
import { EntitiesList } from '@app/shared/classes/entities-list';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-specialties-info',
  templateUrl: './specialties-info.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/entities-list.scss',
    './specialties-info.component.scss',
  ],
})
export class SpecialtiesInfoComponent extends EntitiesList {
  protected _createItemPath = ['create-specialty'];
  protected _newItemChanel = PopupChanelEnum.CREATE_SPECIALTY;
}
