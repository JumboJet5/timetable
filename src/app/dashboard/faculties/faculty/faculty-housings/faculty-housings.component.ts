import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HousingService } from '@app/service/housing/housing.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Component({
  selector: 'app-faculty-housings',
  templateUrl: './faculty-housings.component.html',
  styleUrls: ['./faculty-housings.component.scss'],
})
export class FacultyHousingsComponent implements OnInit {
  public facultyHousings: IHousing[];
  public isLoading = false;

  constructor(private _housingService: HousingService,
              private _smartDetailsService: SmartDetailsService,
              private _popupService: PopupService) {}

  private _univHousings: IHousing[];

  public get univHousings(): IHousing[] {
    return this._univHousings;
  }

  public set univHousings(value: IHousing[]) {
    this._univHousings = [...value];
    this.sortHousing();
  }

  private _facultyId: number;

  @Input()
  public set facultyId(value: number) {
    this._facultyId = value;
    this._loadFacultyHousings();
  }

  private _univId: number;

  @Input()
  public set univId(value: number) {
    this._univId = value;
    this._loadUnivHousings();
  }

  public ngOnInit(): void {
    this._popupService.getChanel(PopupChanelEnum.CREATE_HOUSING)
      .subscribe((housing: IHousing) => this._univHousings.push(housing));
  }

  public isHousingEnabledForFaculty(id: number): boolean {
    return !!this.facultyHousings && !!this.facultyHousings.find(housing => housing.id === id);
  }

  public housingStatusChanged($event: MatCheckboxChange, housing: IHousing) {
  }

  public createHousing() {
    this._popupService.openReactiveModal(['create-housing'], {univ: this._univId});
  }

  public sortHousing(): void {
    if (!!this.facultyHousings) this._univHousings.sort(this._housingEnableComparator.bind(this));
  }

  public openDetails(entity: IHousing) {
    this._smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.HOUSING};
  }

  private _loadFacultyHousings(): void {
    this.isLoading = false;
    this._housingService.getHousings({faculty: this._facultyId})
      .subscribe(res => (this.facultyHousings = res.results) && !!this.univHousings && (this.univHousings = [...this.univHousings]))
      .add(() => this.isLoading = false);
  }

  private _loadUnivHousings(): void {
    this.isLoading = false;
    this._housingService.getHousings({univ: this._univId})
      .subscribe(res => this.univHousings = res.results)
      .add(() => this.isLoading = false);
  }

  private _housingEnableComparator(firstHousing: IHousing, secondHousing: IHousing): number {
    switch (true) {
      case !this.isHousingEnabledForFaculty(firstHousing.id) && this.isHousingEnabledForFaculty(secondHousing.id):
        return 1;
      case this.isHousingEnabledForFaculty(firstHousing.id) && !this.isHousingEnabledForFaculty(secondHousing.id):
        return -1;
      default:
        return 0;
    }
  }
}
