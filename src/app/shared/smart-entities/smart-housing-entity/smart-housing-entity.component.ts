import { Component, Input } from '@angular/core';
import { HousingEntityService } from '@app/service/housing-entity/housing-entity.service';
import { HousingService } from '@app/service/housing/housing.service';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Component({
  selector: 'app-smart-housing-entity',
  templateUrl: './smart-housing-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-housing-entity.component.scss'],
  providers: [HousingEntityService],
})
export class SmartHousingEntityComponent {
  public isLoading = false;

  constructor(private housingService: HousingService,
              public housingEntityService: HousingEntityService) { }

  private _housing: IHousing;

  public get housing(): IHousing {
    return this._housing;
  }

  @Input()
  public set housing(value: IHousing) {
    this._housing = value;
    this.reset();
  }

  public save() {
    if (this.housingEntityService.form.invalid || !this.housing) return;

    this.isLoading = true;
    this.housingService.updateHousing(this.housing.id, this.housingEntityService.getFormValue())
      .subscribe(res => Object.assign(this.housing, res))
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.housingEntityService.resetForm(this.housing);
  }
}
