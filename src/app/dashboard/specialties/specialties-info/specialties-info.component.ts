import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialties-info',
  templateUrl: './specialties-info.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './specialties-info.component.scss'],
})
export class SpecialtiesInfoComponent implements OnInit, OnDestroy {
  public searchControl: FormControl = new FormControl('');
  public specialties: ISpecialty[] = [];
  public pageOffset = 0;
  public pageSize = 20;
  public isLoading = false;
  public isLast = false;
  public ordering = 'name';
  public filters: IRequestParams = {};
  private _unsubscribe: Subject<void> = new Subject();
  private _unsubscribeComponent: Subject<void> = new Subject();

  constructor(private _specialtyService: SpecialtyService,
              private _popupService: PopupService,
              private _route: ActivatedRoute) { }

  public ngOnInit(): void {
    this._route.queryParams
      .pipe(takeUntil(this._unsubscribeComponent))
      .subscribe((value: Params) => {
        this.filters = value || {};
        this._resetData();
      });

    this.searchControl.valueChanges
      .pipe(takeUntil(this._unsubscribeComponent))
      .pipe(debounceTime(500))
      .subscribe(() => this._resetData());

    this._popupService.getChanel(PopupChanelEnum.CREATE_SPECIALTY)
      .pipe(takeUntil(this._unsubscribeComponent))
      .pipe(switchMap(value => this._specialtyService.createSpecialty(value)))
      .subscribe();
  }

  public loadNextPage(): void {
    if (this.isLoading || this.isLast) return;

    this.isLoading = true;
    const params: IRequestParams = {
      offset: this.pageOffset,
      limit: this.pageSize, ...this.filters,
      ordering: this.ordering,
      search: this.searchControl.value,
    };
    this._specialtyService.getSpecialties(params)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(res => {
        this.specialties.push(...res.results);
        this.isLast = !res.next;
        this.pageOffset = this.specialties.length;
      })
      .add(() => this.isLoading = false);
  }

  public createSpecialty() {
    this._popupService.openReactiveModal(['create-specialty'], {...this.filters});
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
    this._unsubscribeComponent.next();
    this._unsubscribeComponent.complete();
  }

  private _resetData(): void {
    this.pageOffset = 0;
    this.specialties = [];
    this.isLast = false;
    this.isLoading = false;
    this._unsubscribe.next();
    this.loadNextPage();
  }
}
