import { Component } from '@angular/core';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { degreeMap } from '@const/collections';
import { IGroup } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './groups-list.component.scss'],
})
export class GroupsListComponent extends ItemsListComponent<IGroup> {
  public degreeMap = degreeMap();

  constructor(private _groupService: GroupService,
              protected _popupService: PopupService) {
    super(itemServiceFactory<IGroup>(params => this._groupService.getGroups(params),
      id => this._groupService.deleteGroup(id)), _popupService);
  }
}
