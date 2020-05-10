import { Component, Input } from '@angular/core';
import { PeriodEntityService } from '@app/service/period-entity/period-entity.service';
import { PeriodService } from '@app/service/period/period.service';
import { IPeriod } from 'src/core/interfaces/period.interface';

@Component({
  selector: 'app-smart-period-entity',
  templateUrl: './smart-period-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-period-entity.component.scss'],
  providers: [PeriodEntityService],
})
export class SmartPeriodEntityComponent {
  public isLoading = false;

  constructor(public periodEntityService: PeriodEntityService,
              private _periodService: PeriodService) { }

  private _period: IPeriod;

  public get period(): IPeriod {
    return this._period;
  }

  @Input()
  public set period(value: IPeriod) {
    this._period = value;
    this.reset();
  }

  public save() {
    if (this.periodEntityService.form.invalid || !this.period) return;

    this.isLoading = true;
    this._periodService.updatePeriod(this.period.id, this.periodEntityService.form.value)
      .subscribe(res => Object.assign(this.period, res) && this.reset())
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.periodEntityService.resetForm(this.period);
  }
}
