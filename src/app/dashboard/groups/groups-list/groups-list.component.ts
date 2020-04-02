import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { degreeMap } from '@const/collections';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IGroup } from 'src/core/interfaces/group.interface';
import { IRequestParams } from 'src/core/interfaces/request-param.interface';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './groups-list.component.scss'],
})
export class GroupsListComponent implements OnInit, OnDestroy {
  public searchControl: FormControl = new FormControl('');
  public groups: IGroup[] = [];
  public pageOffset = 0;
  public pageSize = 20;
  public isLoading = false;
  public isLast = false;
  public ordering = 'name';
  public filters: IRequestParams = {};
  public degreeMap = degreeMap();
  private _unsubscribe: Subject<void> = new Subject();
  private _unsubscribeComponent: Subject<void> = new Subject();

  constructor(private _groupService: GroupService,
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
  }

  public onViewportAction(event: any) {
    if (event && event.visible) this._loadNextPage();
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
    this._unsubscribeComponent.next();
    this._unsubscribeComponent.complete();
  }

  private _loadNextPage(): void {
    if (this.isLoading || this.isLast) return;

    this.isLoading = true;
    const params: IRequestParams = {
      offset: this.pageOffset,
      limit: this.pageSize, ...this.filters,
      ordering: this.ordering,
      search: this.searchControl.value,
    };
    this._groupService.getGroups(params)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(res => {
        this.groups.push(...res.results);
        this.isLast = !res.next;
        this.pageOffset = this.groups.length;
      })
      .add(() => this.isLoading = false);
  }

  private _resetData(): void {
    this.pageOffset = 0;
    this.groups = [];
    this.isLast = false;
    this.isLoading = false;
    this._unsubscribe.next();
    this._loadNextPage();
  }
}
