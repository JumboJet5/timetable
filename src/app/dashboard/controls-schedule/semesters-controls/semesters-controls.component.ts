import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { HousingService } from '@app/service/housing/housing.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { ThemeService } from '@app/service/theme/theme.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { IHousing } from 'src/core/interfaces/housing.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-semesters-controls',
  templateUrl: './semesters-controls.component.html',
  styleUrls: ['./semesters-controls.component.scss'],
})
export class SemestersControlsComponent implements OnInit, OnDestroy {
  public controlListFilters: IRequestParams;
  public groupId: number;
  public semesters: ISemester[];
  public groupsemesters: IGroupsemester[];
  public themes: ITheme[];
  public housings: IHousing[];
  public isLoading = false;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _groupsemesterService: GroupsemesterService,
              private _semesterService: SemesterService,
              private _themeService: ThemeService,
              private _housingService: HousingService,
              private _popupService: PopupService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  private _currGroupsemester: number;

  public get currGroupsemester(): number {
    return this._currGroupsemester;
  }

  public set currGroupsemester(value: number) {
    if (value === this.currGroupsemester) return;

    this._currGroupsemester = value;
    this.controlListFilters = {group_semester: value};
    this._router.navigate([], {queryParams: this._getActualQueryParams()});
  }

  public ngOnInit(): void {
    this._getGroupByRoute();

    this._popupService.getChanel(PopupChanelEnum.CREATE_CONTROL)
      .subscribe(() => this.controlListFilters = {...this.controlListFilters});
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  public createControl() {
    if (!this.currGroupsemester) return;

    this._popupService.openReactiveModal(['create-control'], this._getActualQueryParams());
  }

  private _getGroupByRoute(): void {
    this._route.queryParams
      .pipe(takeUntil(this._unsubscribe))
      .pipe(filter(params => !!params.group && params.group !== this.groupId))
      .pipe(tap(params => this.groupId = +params.group))
      .pipe(tap(params => this.currGroupsemester = +params.group_semester))
      .pipe(tap(() => this.isLoading = true))
      .subscribe(() => this._updateInfo());
  }

  private _getActualQueryParams(): IRequestParams {
    if (this.currGroupsemester) return {...this._route.snapshot.queryParams, group_semester: this.currGroupsemester};
    return this._route.snapshot.queryParams;
  }

  private _updateInfo(): void {
    this.semesters = [];
    this.groupsemesters = [];
    this.themes = [];
    this._groupsemesterService.getGroupsemesters(this.groupId)
      .subscribe(res => this.groupsemesters = res.results);
    this._semesterService.getSemesters({group: this.groupId})
      .subscribe(res => this.semesters = res.results);
    this._themeService.getThemes({group: this.groupId})
      .subscribe(res => this.themes = res.results);
    this._housingService.getHousings({group: this.groupId})
      .subscribe(res => this.housings = res.results);
  }
}
