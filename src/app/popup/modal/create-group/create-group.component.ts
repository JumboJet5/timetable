import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GroupEntityService } from '@app/service/group-entity/group-entity.service';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { CreateEntityModal } from '@app/shared/classes/create-entity-modal';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IGroup, IGroupEntity } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-group.component.scss'],
  providers: [GroupEntityService],
})
export class CreateGroupComponent extends CreateEntityModal<IGroup, IGroupEntity> {
  protected _chanelId: number = PopupChanelEnum.CREATE_GROUP;

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              protected _popupService: PopupService,
              protected _groupService: GroupService,
              public groupEntityService: GroupEntityService) {
    super(_route, _router, _popupService, _groupService, groupEntityService);
  }

  protected _applyParamsChange(params: Params): void {
    this.groupEntityService.resetForm({univ: +params.univ, faculty: +params.faculty, specialty: +params.specialty, course: +params.course});
  }
}
