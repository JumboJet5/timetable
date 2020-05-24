import { Component } from '@angular/core';
import { YearEntityService } from '@app/service/year-entity/year-entity.service';
import { YearService } from '@app/service/year/year.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { IYear } from 'src/core/interfaces/year.interface';

@Component({
  selector: 'app-smart-year-entity',
  templateUrl: './smart-year-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-year-entity.component.scss'],
  providers: [YearEntityService],
})
export class SmartYearEntityComponent extends SmartItemEntity<IYear> {
  constructor(protected _yearService: YearService,
              public yearEntityService: YearEntityService) {
    super(_yearService, yearEntityService);
  }
}
