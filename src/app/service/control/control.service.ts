import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { IControl } from 'src/core/interfaces/control.interface';
import { CONTROL, CONTROLS } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class ControlService extends EntityCrudService<IControl> {
  protected _itemsURL = CONTROLS;
  protected _itemURL = CONTROL;
}
