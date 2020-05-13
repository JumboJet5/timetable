import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { EntityWithImageCrudService } from '@app/shared/classes/entity-with-image-crud.service';
import { ITeacher } from 'src/core/interfaces/teacher.interface';
import { TEACHER, TEACHERS } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class TeacherService extends EntityWithImageCrudService<ITeacher> {
  protected _itemsURL = TEACHERS;
  protected _itemURL = TEACHER;

  constructor(protected http: HttpClient,
              protected formatService: FormatService) {
    super(http, formatService);
  }
}
