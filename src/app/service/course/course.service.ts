import { Injectable } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { ICourse } from 'src/core/interfaces/course.interface';
import { COURSE, COURSES } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class CourseService extends EntityCrudService<ICourse> {
  protected _itemsURL = COURSES;
  protected _itemURL = COURSE;
}
