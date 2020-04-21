import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';

@Component({
  selector: 'app-faculties-info',
  templateUrl: './faculties-info.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './faculties-info.component.scss'],
})
export class FacultiesInfoComponent implements OnInit, OnDestroy {
  public searchControl: FormControl = new FormControl('');
  public ordering = 'name';
  public filters: IFilterParams = {};
  private _searchValue = '';
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _facultyService: FacultyService,
              private _popupService: PopupService,
              private _route: ActivatedRoute) { }

  public ngOnInit(): void {
    this._route.queryParams
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((value: Params) => this.filters = {ordering: this.ordering, search: this._searchValue, ...(value || {})});

    this._popupService.getChanel(PopupChanelEnum.CREATE_FACULTY)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.filters = {...this.filters});

    this.searchControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this._searchValue = value;
        this.filters = {ordering: this.ordering, search: this._searchValue, ...(value || {})};
      });
  }

  public createFaculty() {
    this._popupService.openReactiveModal(['create-faculty'], {...this.filters});
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
