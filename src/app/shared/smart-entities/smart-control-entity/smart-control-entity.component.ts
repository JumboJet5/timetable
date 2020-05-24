import { Component } from '@angular/core';
import { ControlEntityService } from '@app/service/control-entity/control-entity.service';
import { ControlService } from '@app/service/control/control.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { IControl } from 'src/core/interfaces/control.interface';

@Component({
  selector: 'app-smart-control-entity',
  templateUrl: './smart-control-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-control-entity.component.scss'],
  providers: [ControlEntityService],
})
export class SmartControlEntityComponent extends SmartItemEntity<IControl> {
  constructor(private _controlService: ControlService,
              public controlEntityService: ControlEntityService) {
    super(_controlService, controlEntityService);
  }
}
