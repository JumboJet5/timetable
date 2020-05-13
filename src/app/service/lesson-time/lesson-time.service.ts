import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { LESSON_TIME, LESSON_TIMES } from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class LessonTimeService extends EntityCrudService<ILessonTime> {
  protected _itemsURL = LESSON_TIMES;
  protected _itemURL = LESSON_TIME;
}
