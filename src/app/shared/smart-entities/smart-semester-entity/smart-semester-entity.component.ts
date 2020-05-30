import { Component } from '@angular/core';
import { SemesterEntityService } from '@app/service/semester-entity/semester-entity.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { ISemester } from 'src/core/interfaces/semester.interface';

@Component({
  selector: 'app-smart-semester-entity',
  templateUrl: './smart-semester-entity.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/loader.scss',
    './smart-semester-entity.component.scss',
  ],
  providers: [SemesterEntityService],
})
export class SmartSemesterEntityComponent extends SmartItemEntity<ISemester> {
  constructor(protected _semesterService: SemesterService,
              public semesterEntityService: SemesterEntityService) {
    super(_semesterService, semesterEntityService);
    semesterEntityService.disableControls(['year']);
  }
}
