import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { HousingService } from '@app/service/housing/housing.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IHousing } from 'src/core/interfaces/housing.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.scss'],
})
export class HousingComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public housing: IHousing;
  public housingId: number;
  public roomFilters: IFilterParams;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _groupService: GroupService,
              private _popupService: PopupService,
              private _housingService: HousingService) { }

  ngOnInit(): void {
    this._getHousingByRoute();

    this._popupService.getChanel(PopupChanelEnum.CREATE_ROOM)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.roomFilters = {...this.roomFilters});
  }

  public saveHousing(housing: IHousing): void {
    this.isLoading = true;
    this._housingService.updateHousing(this.housingId, housing)
      .subscribe(res => this.housing = res)
      .add(() => this.isLoading = false);
  }

  public delete() {
    this._popupService.openDialog({
        header: 'Вилучити корпус?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._housingService.deleteHousing(this.housingId)
        .subscribe(() => this._router.navigate(['dashboard', 'faculties'])));
  }

  public createRoom() {
    this._popupService.openReactiveModal(['create-room'], {housing: this.housingId});
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _getCurrentHousing(): void {
    this.isLoading = true;
    this._housingService.getHousing(this.housingId)
      .subscribe(housing => this.housing = housing)
      .add(() => this.isLoading = false);
  }

  private _getHousingByRoute(): void {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribe),
        filter(params => +params.id !== this.housingId),
      )
      .subscribe(params => this._updateContent(+params.id));
  }

  private _updateContent(facultyId: number): void {
    this.housingId = facultyId;
    this.roomFilters = {housing: this.housingId, ordering: 'num'};
    this._getCurrentHousing();
  }
}
