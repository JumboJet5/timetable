import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { YearEntityService } from '@app/service/year-entity/year-entity.service';
import { YearService } from '@app/service/year/year.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-year',
  templateUrl: './create-year.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-year.component.scss'],
  providers: [YearEntityService],
})
export class CreateYearComponent implements OnInit {
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_YEAR;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public yearEntityService: YearEntityService,
              private yearService: YearService,
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
    if (this.yearEntityService.form.invalid) return;

    this.isLoading = true;
    this.yearService.createItem(this.yearEntityService.form.value)
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  private _applyQueryParams() {
    this.yearEntityService.resetForm({univ: +this.route.snapshot.queryParams.univ});
  }
}
