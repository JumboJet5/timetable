import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { accordionTransitionAnimation } from '@animations/accordion.animation';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IGroupsemester, IGroupsemesterSimplified } from 'src/core/interfaces/groupsemester.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-groupsemester-details',
  templateUrl: './groupsemester-details.component.html',
  styleUrls: ['../../../../../../core/stylesheet/default-form.scss', './groupsemester-details.component.scss'],
  animations: [accordionTransitionAnimation],
})
export class GroupsemesterDetailsComponent implements OnInit {
  @Output() public lessonTimesChange: EventEmitter<ILessonTime[]> = new EventEmitter<ILessonTime[]>();
  @Input() public groupThemes: ITheme[];
  @Input() public lessonTimes: ILessonTime[];
  @Input() public semester: ISemester;
  @Input() facultyId: number;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  public isLoading = false;
  public needUpdate: Subject<void> = new Subject<void>();
  private _initialGroupsemester: IGroupsemester;
  private _unsubscribeUpdating: Subject<void> = new Subject<void>();
  private _unsubscribeDeleting: Subject<void> = new Subject<void>();
  private _updateSuccessTimeoutId;
  private _updateFailedTimeoutId;

  constructor(private groupsemesterService: GroupsemesterService,
              private lessonTimeService: LessonTimeService,
              private smartDetailsService: SmartDetailsService,
              private popupService: PopupService) { }

  private _isOpened = false;

  public get isOpened(): boolean {
    return this._isOpened;
  }

  public set isOpened(value: boolean) {
    this._isOpened = value;
    if (!this.isOpened) this.groupThemes = [...this.groupThemes];
  }

  private _isUpdateSuccess = false;

  public get isUpdateSuccess(): boolean {
    return this._isUpdateSuccess;
  }

  public set isUpdateSuccess(value: boolean) {
    this._isUpdateSuccess = value;
    clearTimeout(this._updateSuccessTimeoutId);
    if (value) this._updateSuccessTimeoutId = setTimeout(() => this._isUpdateSuccess = false, 1180);
  }

  private _isUpdateFailed = false;

  public get isUpdateFailed(): boolean {
    return this._isUpdateFailed;
  }

  public set isUpdateFailed(value: boolean) {
    this._isUpdateFailed = value;
    clearTimeout(this._updateFailedTimeoutId);
    if (value) this._updateFailedTimeoutId = setTimeout(() => this._isUpdateFailed = false, 1270);
  }

  private _groupsemester: IGroupsemester;

  public get groupsemester(): IGroupsemester {
    return this._groupsemester;
  }

  @Input()
  public set groupsemester(value: IGroupsemester) {
    this._groupsemester = {...value};
    this._initialGroupsemester = value;
  }

  ngOnInit(): void {
    this.needUpdate.asObservable()
      .pipe(debounceTime(500))
      .subscribe(() => this._updateGroupsemesters());
  }

  public deleteGroupSemester(): void {
    if (!this.groupsemester) return;

    this.popupService.openDialog({
        header: 'Вилучити семестр?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this.groupsemesterService.deleteGroupSemester(this.groupsemester.id)
        .pipe(takeUntil(this._unsubscribeDeleting))
        .subscribe(() => this.delete.emit(this.groupsemester.id)) && (this.isLoading = true));
  }

  public deleteLessonTime(id: number) {
    const index = this.lessonTimes.findIndex(time => time.id === id);
    if (index < 0) return;

    this.isUpdateSuccess = false;
    this.isUpdateFailed = false;
    this.popupService.openDialog({
        header: 'Вилучити розклад пари?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this.lessonTimeService.deleteLessonTime(id)
        .pipe(takeUntil(this._unsubscribeDeleting))
        .subscribe(() => this.lessonTimes.splice(index, 1) && (this.isUpdateSuccess = true), () => this.isUpdateFailed = true)
        .add(() => this.isLoading = false) && (this.isLoading = true));
  }

  public openDetails(entity: ISemester) {
    this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.SEMESTER};
  }

  private _updateGroupsemesters(): void {
    if (!this.groupsemester) return;

    this.isUpdateSuccess = false;
    this.isUpdateFailed = false;
    this.isLoading = true;
    this._unsubscribeUpdating.next();
    this.groupsemesterService.updateGroupsemester(this.groupsemester)
      .pipe(takeUntil(this._unsubscribeUpdating))
      .subscribe(updated => this._onGroupsemesterSuccessUpdate(updated), () => this._onGroupsemesterFailedUpdate())
      .add(() => this.isLoading = false);
  }

  private _onGroupsemesterSuccessUpdate(groupsemester: IGroupsemesterSimplified): void {
    const themes = groupsemester.themes.map(themeId => this.groupThemes.find(theme => theme.id === themeId));
    const lessons_time = groupsemester.lessons_time.map(timeId => this.lessonTimes.find(time => time.id === timeId));
    this.groupsemester = {...groupsemester, themes, lessons_time};
    this.isUpdateSuccess = true;
  }

  private _onGroupsemesterFailedUpdate(): void {
    this.groupsemester = this._initialGroupsemester;
    this.isUpdateFailed = true;
  }
}
