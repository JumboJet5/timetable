import { Component, Input, OnInit } from '@angular/core';
import { HousingService } from '@app/service/housing/housing.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Component({
  selector: 'app-university-housings',
  templateUrl: './university-housings.component.html',
  styleUrls: ['./university-housings.component.scss'],
})
export class UniversityHousingsComponent implements OnInit {
  public housings: IHousing[];
  public isLoading = false;

  constructor(private _housingService: HousingService,
              private _smartDetailsService: SmartDetailsService,
              private _popupService: PopupService) {}

  private _univId: number;

  @Input()
  public set univId(value: number) {
    this._univId = value;
    this._loadUnivHousings();
  }

  public ngOnInit(): void {
    this._popupService.getChanel(PopupChanelEnum.CREATE_HOUSING)
      .subscribe((housing: IHousing) => this.housings.push(housing));
  }

  public createHousing() {
    this._popupService.openReactiveModal(['create-housing'], {univ: this._univId});
  }

  public openDetails(entity: IHousing) {
    this._smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.HOUSING};
  }

  public deleteHousing(id: number) {
    const index = this.housings.findIndex(housing => housing.id === id);
    if (index < 0) return;

    this._popupService.openDialog({
        header: 'Вилучити корпус?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => (this.isLoading = true) && this._housingService.deleteHousing(id)
        .subscribe(() => this.housings.splice(index, 1))
        .add(() => this.isLoading = false));
  }

  private _loadUnivHousings(): void {
    this.isLoading = false;
    this._housingService.getHousings({univ: this._univId})
      .subscribe(res => this.housings = res.results)
      .add(() => this.isLoading = false);
  }
}
