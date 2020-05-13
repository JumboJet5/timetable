import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityFormService } from '@app/shared/classes/entity-form.service';
import { IRoom } from 'src/core/interfaces/room.interface';

@Injectable()
export class RoomEntityService extends EntityFormService<IRoom> {
  public form: FormGroup = new FormGroup({
    num: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.min(0)),
    housing: new FormControl('', Validators.required),
  });
}
