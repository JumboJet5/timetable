import { Component } from '@angular/core';
import { FacultyEntityService } from '@app/service/faculty-entity/faculty-entity.service';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Component({
  selector: 'app-smart-faculty-entity',
  templateUrl: './smart-faculty-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-faculty-entity.component.scss'],
  providers: [FacultyEntityService],
})
export class SmartFacultyEntityComponent extends SmartItemEntity<IFaculty> {
  constructor(protected _facultyService: FacultyService,
              public facultyEntityService: FacultyEntityService) {
    super(_facultyService, facultyEntityService);
  }
}
