import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { SEMESTER, SEMESTERS } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class SemesterService extends EntityCrudService<ISemester> {
  protected _itemsURL = SEMESTERS;
  protected _itemURL = SEMESTER;
}
