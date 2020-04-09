import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';

@Component({
  selector: 'app-groups-info',
  templateUrl: './groups-info.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './groups-info.component.scss'],
})
export class GroupsInfoComponent implements OnInit, OnDestroy {
  public searchControl: FormControl = new FormControl('');
  public ordering = 'name';
  public filters: IRequestParams = {};
  private _unsubscribe: Subject<void> = new Subject();
  private _searchValue = '';

  constructor(private _groupService: GroupService,
              private _route: ActivatedRoute) { }

  public ngOnInit(): void {
    this._route.queryParams
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((value: Params) => this.filters = {ordering: this.ordering, search: this._searchValue, ...(value || {})});

    this.searchControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this._searchValue = value;
        this.filters = {ordering: this.ordering, search: this._searchValue, ...(value || {})};
      });
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
