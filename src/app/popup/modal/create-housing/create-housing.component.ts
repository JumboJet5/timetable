import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingEntityService } from '@app/service/housing-entity/housing-entity.service';
import { HousingService } from '@app/service/housing/housing.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-housing',
  templateUrl: './create-housing.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-housing.component.scss'],
  providers: [HousingEntityService],
})
export class CreateHousingComponent implements OnInit {
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_HOUSING;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public housingEntityService: HousingEntityService,
              private housingService: HousingService,
              private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.route.queryParams
      .subscribe(() => this._applyQueryParams());
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public create() {
    if (this.housingEntityService.form.invalid) return;

    this.isLoading = true;
    this.housingService.createHousing(this.housingEntityService.getFormValue())
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  private _applyQueryParams() {
    this.housingEntityService.resetForm({univ: +this.route.snapshot.queryParams.univ});
  }
}
