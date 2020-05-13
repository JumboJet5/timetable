import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { EntityWithImageCrudService } from '@app/shared/classes/entity-with-image-crud.service';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { FACULTIES, FACULTY } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class FacultyService extends EntityWithImageCrudService<IFaculty> {
  protected _itemsURL = FACULTIES;
  protected _itemURL = FACULTY;

  constructor(protected http: HttpClient,
              protected formatService: FormatService) {
    super(http, formatService);
  }
}
