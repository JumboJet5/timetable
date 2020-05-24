import { Component, Input } from '@angular/core';
import { GroupEntityService } from '@app/service/group-entity/group-entity.service';
import { GroupService } from '@app/service/group/group.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { IGroup, IGroupEntity } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-smart-group-entity',
  templateUrl: './smart-group-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-group-entity.component.scss'],
  providers: [GroupEntityService],
})
export class SmartGroupEntityComponent extends SmartItemEntity<IGroup, IGroupEntity> {
  @Input() public isCourseReadonly = true;

  constructor(protected _groupService: GroupService,
              public groupEntityService: GroupEntityService) {
    super(_groupService, groupEntityService);
  }
}
