import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HousingService } from '@app/service/housing/housing.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IHousing } from 'src/core/interfaces/housing.interface';

@Component({
  selector: 'app-faculty-housings',
  templateUrl: './faculty-housings.component.html',
  styleUrls: ['./faculty-housings.component.scss'],
})
export class FacultyHousingsComponent implements OnInit {
  public facultyHousings: IHousing[];
  public univHousings: IHousing[];
  public isLoading = false;

  constructor(private _housingService: HousingService,
              private _popupService: PopupService) {}

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
      .subscribe((housing: IHousing) => this.univHousings.push(housing));
  }

  public isHousingEnabledForFaculty(id: number): boolean {
    return !!this.facultyHousings && !!this.facultyHousings.find(housing => housing.id === id);
  }

  public housingStatusChanged($event: MatCheckboxChange, housing: IHousing) {
  }

  public createHousing() {
    this._popupService.openReactiveModal(['create-housing'], {univ: this._univId});
  }

  private _loadFacultyHousings(): void {
    this.isLoading = false;
    this._housingService.getHousings({faculty: this._facultyId})
      .subscribe(res => this.facultyHousings = res.results)
      .add(() => this.isLoading = false);
  }

  private _loadUnivHousings(): void {
    this.isLoading = false;
    this._housingService.getHousings({univ: this._univId})
      .subscribe(res => this.univHousings = res.results)
      .add(() => this.isLoading = false);
  }
}
