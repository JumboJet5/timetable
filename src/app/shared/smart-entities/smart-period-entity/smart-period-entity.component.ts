import { Component } from '@angular/core';
import { PeriodEntityService } from '@app/service/period-entity/period-entity.service';
import { PeriodService } from '@app/service/period/period.service';
import { SmartItemEntity } from '@app/shared/classes/smart-item-entity';
import { IPeriod } from 'src/core/interfaces/period.interface';

@Component({
  selector: 'app-smart-period-entity',
  templateUrl: './smart-period-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-period-entity.component.scss'],
  providers: [PeriodEntityService],
})
export class SmartPeriodEntityComponent extends SmartItemEntity<IPeriod> {
  public isLoading = false;

  constructor(protected _periodService: PeriodService,
              public periodEntityService: PeriodEntityService) {
    super(_periodService, periodEntityService);
  }
}
