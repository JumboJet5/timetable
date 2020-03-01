import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IGroup } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit, OnDestroy {
  public group: IGroup;
  private _groupSlug: string;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _groupService: GroupService) { }

  ngOnInit(): void {
    this._route.params
      .pipe(takeUntil(this._unsubscribe))
      .pipe(filter(params => params.groupSlug !== this._groupSlug))
      .pipe(tap(params => this._groupSlug = params.groupSlug))
      .pipe(switchMap(() => this._groupService.getGroup(this._groupSlug)))
      .subscribe(res => this.group = res);
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
