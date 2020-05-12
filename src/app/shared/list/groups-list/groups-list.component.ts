import { Component, Optional } from '@angular/core';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { degreeMap } from '@const/collections';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IGroup } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './groups-list.component.scss'],
})
export class GroupsListComponent extends ItemsListComponent<IGroup> {
  public degreeMap = degreeMap();
  public emptyListMessage = 'Список груп пустий';

  constructor(private _groupService: GroupService,
              protected _popupService: PopupService,
              @Optional() public smartDetailsService: SmartDetailsService) {
    super(itemServiceFactory<IGroup>(params => this._groupService.getGroups(params),
      id => this._groupService.deleteGroup(id)), _popupService, smartDetailsService);
  }

  public getItemDetailsEntity(entity: IGroup): void {
    if (!!this.smartDetailsService) this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.GROUP};
  }
}
