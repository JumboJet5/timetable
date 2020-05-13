import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { EntityWithImageCrudService } from '@app/shared/classes/entity-with-image-crud.service';
import { IUniversity } from '@interfaces';
import { UNIVERSITIES, UNIVERSITY } from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class UniversityService extends EntityWithImageCrudService<IUniversity> {
  protected _itemsURL = UNIVERSITIES;
  protected _itemURL = UNIVERSITY;

  constructor(protected http: HttpClient,
              protected formatService: FormatService) {
    super(http, formatService);
  }
}
