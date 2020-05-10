import { Component, Input } from '@angular/core';
import { YearEntityService } from '@app/service/year-entity/year-entity.service';
import { YearService } from '@app/service/year/year.service';
import { IYear } from 'src/core/interfaces/year.interface';

@Component({
  selector: 'app-smart-year-entity',
  templateUrl: './smart-year-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-year-entity.component.scss'],
  providers: [YearEntityService],
})
export class SmartYearEntityComponent {
  public isLoading = false;

  constructor(public yearEntityService: YearEntityService,
              private _yearService: YearService) { }

  private _year: IYear;

  public get year(): IYear {
    return this._year;
  }

  @Input()
  public set year(value: IYear) {
    this._year = value;
    this.reset();
  }

  public save() {
    if (this.yearEntityService.form.invalid || !this.year) return;

    this.isLoading = true;
    this._yearService.updateYear(this.year.id, this.yearEntityService.form.value)
      .subscribe(res => Object.assign(this.year, res) && this.reset())
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.yearEntityService.resetForm(this.year);
  }
}
