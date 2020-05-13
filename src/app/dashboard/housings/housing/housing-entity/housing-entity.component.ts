import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HousingEntityService } from '@app/service/housing-entity/housing-entity.service';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Component({
  selector: 'app-housing-entity',
  templateUrl: './housing-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './housing-entity.component.scss'],
  providers: [HousingEntityService],
})
export class HousingEntityComponent {
  @Output() public save: EventEmitter<IHousing> = new EventEmitter<IHousing>();

  constructor(public housingEntityService: HousingEntityService) {
    housingEntityService.disableControls(['univ']);
  }

  private _housing: IHousing;

  public get housing(): IHousing {
    return this._housing;
  }

  @Input()
  public set housing(value: IHousing) {
    this._housing = value;
    this.resetForm();
  }

  public resetForm(): void {
    this.housingEntityService.resetForm(this.housing);
  }
}
