import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GroupEntityService } from '@app/service/group-entity/group-entity.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IGroup, IUpdateGroup } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-group-entity',
  templateUrl: './group-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './group-entity.component.scss'],
  providers: [GroupEntityService],
})
export class GroupEntityComponent implements OnInit, OnDestroy {
  @Output() save: EventEmitter<IUpdateGroup> = new EventEmitter<IUpdateGroup>();
  @Output() facultyChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() univChanged: EventEmitter<number> = new EventEmitter<number>();
  private _unsubscribe: Subject<void> = new Subject();

  constructor(public groupEntityService: GroupEntityService) { }

  private _group: IGroup;

  public get group(): IGroup {
    return this._group;
  }

  @Input()
  public set group(value: IGroup) {
    this._group = value;
    this.resetForm();
  }

  public ngOnInit(): void {
    this.groupEntityService.facControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this.facultyChanged.emit(+value));

    this.groupEntityService.univControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this.univChanged.emit(+value));
  }

  public resetForm(): void {
    this.groupEntityService.form.reset(this.group);
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
