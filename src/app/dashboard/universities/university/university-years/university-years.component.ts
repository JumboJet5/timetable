import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { PopupService } from '@app/service/modal/popup.service';
import { PeriodService } from '@app/service/period/period.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { YearService } from '@app/service/year/year.service';
import { periodTypesMap } from '@const/collections';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IPeriod } from 'src/core/interfaces/period.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { IYear } from 'src/core/interfaces/year.interface';

@Component({
  selector: 'app-university-years',
  templateUrl: './university-years.component.html',
  styleUrls: ['../../../../../core/stylesheet/items-list.scss', './university-years.component.scss'],
  providers: [SmartDetailsService],
})
export class UniversityYearsComponent implements OnInit, OnDestroy {
  public periodTypesMap = periodTypesMap();
  public activeYear: number;
  public isYearsLoading = false;
  public years: IYear[];
  public semestersMap: Map<number, ISemester[]> = new Map<number, ISemester[]>();
  public periodsMap: Map<number, IPeriod[]> = new Map<number, IPeriod[]>();
  private _unsubscribe: Subject<void> = new Subject();


  constructor(private _yearService: YearService,
              private _semesterService: SemesterService,
              private _smartDetailsService: SmartDetailsService,
              private _periodService: PeriodService,
              private _popupService: PopupService) { }

  private _universityId: number;

  public get universityId(): number {
    return this._universityId;
  }

  @Input()
  public set universityId(value: number) {
    this._universityId = value;
    this._getYears(value);
  }

  ngOnInit(): void {
    this._popupService.getChanel(PopupChanelEnum.CREATE_YEAR)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((year: IYear) => {
        this.years.push(year);
        this.semestersMap.set(year.id, []);
      });

    this._popupService.getChanel(PopupChanelEnum.CREATE_SEMESTER)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((semester: ISemester) => {
        (this.semestersMap.get(semester.year) || []).push(semester);
        this.periodsMap.set(semester.id, []);
      });

    this._popupService.getChanel(PopupChanelEnum.CREATE_PERIOD)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((period: IPeriod) => (this.periodsMap.get(period.semester) || []).push(period));
  }

  public getYearDetails(entity: IYear) {
    this._smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.YEAR};
  }

  public getSemesterDetails(entity: ISemester) {
    this._smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.SEMESTER};
  }

  public getPeriodDetails(entity: IPeriod) {
    this._smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.PERIOD};
  }

  public createYear(): void {
    this._popupService.openReactiveModal(['create-year'], {univ: this.universityId, year: this.activeYear});
  }

  public createSemester(): void {
    this._popupService.openReactiveModal(['create-semester'], {year: this.activeYear, univ: this.universityId});
  }

  public createPeriod(semester: number): void {
    this._popupService.openReactiveModal(['create-period'], {semester, year: this.activeYear});
  }

  public deleteYear(year: number) {
    const index = this.years.findIndex(item => item.id === year);
    if (index < 0) return;

    this._popupService.openDialog({
        header: 'Вилучити навчальний рік?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._yearService.deleteItem(year)
        .subscribe(() => this.years.splice(index, 1)));
  }

  public deleteSemester(semester: number) {
    const semesters = this.semestersMap.get(this.activeYear) || [];
    const index = semesters.findIndex(item => item.id === semester);
    if (index < 0) return;

    this._popupService.openDialog({
        header: 'Вилучити семестер?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._semesterService.deleteItem(semester)
        .subscribe(() => semesters.splice(index, 1)));
  }

  public deletePeriod(period: number, semester: number) {
    const periods = this.periodsMap.get(semester) || [];
    const index = periods.findIndex(item => item.id === period);
    if (index < 0) return;

    this._popupService.openDialog({
        header: 'Вилучити навчальний період?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._periodService.deleteItem(period)
        .subscribe(() => periods.splice(index, 1)));
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _getYears(univ: number): void {
    this.isYearsLoading = true;
    this.semestersMap.clear();
    this._yearService.getItems({univ})
      .subscribe(res => this.years = res.results)
      .add(() => (this.years || []).forEach(year => this._getSemesters(year.id)))
      .add(() => this.isYearsLoading = false);
  }

  private _getSemesters(year: number, ordering: keyof ISemester = 'num'): void {
    this._semesterService.getItems({year, ordering})
      .subscribe(res => this.semestersMap.set(year, res.results))
      .add(() => (this.semestersMap.get(year) || []).forEach(semester => this._getPeriods(semester.id)));
  }

  private _getPeriods(semester: number): void {
    this._periodService.getItems({semester})
      .subscribe(res => this.periodsMap.set(semester, res.results));
  }
}
