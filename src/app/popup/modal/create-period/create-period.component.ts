import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { PeriodEntityService } from '@app/service/period-entity/period-entity.service';
import { PeriodService } from '@app/service/period/period.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-period.component.scss'],
  providers: [PeriodEntityService],
})
export class CreatePeriodComponent implements OnInit {
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_PERIOD;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public periodEntityService: PeriodEntityService,
              private periodService: PeriodService,
              private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.route.queryParams
      .subscribe(() => this._applyQueryParams());
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}], {queryParams: this.route.snapshot.queryParams});
  }

  public create() {
    if (this.periodEntityService.form.invalid) return;

    this.isLoading = true;
    this.periodService.createPeriod(this.periodEntityService.form.value)
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  private _applyQueryParams() {
    this.periodEntityService.resetForm({semester: +this.route.snapshot.queryParams.semester});
  }
}
