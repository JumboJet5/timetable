import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IGroup, IUpdateGroup } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './group.component.scss'],
})
export class GroupComponent implements OnInit, OnDestroy {
  public group: IGroup;
  public facultyId: number;
  public univId: number;
  public isLoading = false;
  private _groupSlug: string;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _popupService: PopupService,
              private _groupService: GroupService) { }

  public ngOnInit(): void {
    this._getGroupByRoute();
  }

  public saveGroupEntity(updateGroup: IUpdateGroup) {
    this.isLoading = true;
    this._groupService.updateItem(this.group.id, updateGroup)
      .subscribe(group => this.group = group)
      .add(() => this.isLoading = false);
  }

  public delete() {
    this._popupService.openDialog({
        header: 'Вилучити групу?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._groupService.deleteItem(this.group.id)
        .subscribe(() => this._router.navigate(['dashboard', 'groups'])));
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _getGroupByRoute(): void {
    this._route.params
      .pipe(takeUntil(this._unsubscribe))
      .pipe(filter(params => params.groupSlug !== this._groupSlug))
      .pipe(tap(params => this._groupSlug = params.groupSlug))
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(() => this._groupService.getItem(this._groupSlug)))
      .subscribe(res => {
        this.group = res;
        this.isLoading = false;
      });
  }
}
