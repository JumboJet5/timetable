import { Component } from '@angular/core';
import { SpecialtyEntityService } from '@app/service/specialty-entity/specialty-entity.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { ISpecialty, ISpecialtyEntity } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-smart-specialty-entity',
  templateUrl: './smart-specialty-entity.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/loader.scss',
    './smart-specialty-entity.component.scss',
  ],
  providers: [SpecialtyEntityService],
})
export class SmartSpecialtyEntityComponent extends SmartItemEntity<ISpecialty, ISpecialtyEntity> {
  constructor(protected _specialtyService: SpecialtyService,
              public specialtyEntityService: SpecialtyEntityService) {
    super(_specialtyService, specialtyEntityService);
  }
}
