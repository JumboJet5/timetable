import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatService } from '@app/service/format/format.service';
import { EntityWithImageCrudService } from '@app/shared/classes/entity-with-image-crud.service';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';
import { SPECIALTIES, SPECIALTY } from 'src/core/urls';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService extends EntityWithImageCrudService<ISpecialty> {
  protected _itemsURL = SPECIALTIES;
  protected _itemURL = SPECIALTY;

  constructor(protected http: HttpClient,
              protected formatService: FormatService) {
    super(http, formatService);
  }
}
