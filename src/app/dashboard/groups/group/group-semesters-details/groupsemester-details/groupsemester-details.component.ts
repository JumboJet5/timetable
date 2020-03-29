import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { accordionTransitionAnimation } from '@animations/accordion.animation';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
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
  @Input() public groupThemes: ITheme[];
  @Input() public lessonTimes: ILessonTime[];
  @Input() public semester: ISemester;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  public isOpened = false;
  private _initialGroupsemester: IGroupsemester;
  private _needUpdate: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  private _unsubscribeUpdating: Subject<void> = new Subject<void>();
  private _unsubscribeDeleting: Subject<void> = new Subject<void>();

  constructor(private groupsemesterService: GroupsemesterService,
              private semesterService: SemesterService,
              private popupService: PopupService) { }

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
    this._needUpdate.asObservable()
      .pipe(debounceTime(500))
      .subscribe(() => this._updateGroupsemesters());
  }

  public isThemeEnableForGroupsemester(themeId: number, groupsemester: IGroupsemester): boolean {
    return !!groupsemester && !!groupsemester.themes && groupsemester.themes.some(theme => theme.id === themeId);
  }

  public isLessonTimeEnableForGroupsemester(lessonTimeId: number, groupsemester: IGroupsemester): boolean {
    return !!groupsemester && !!groupsemester.lessons_time && groupsemester.lessons_time.some(lessonTime => lessonTime.id === lessonTimeId);
  }

  public themeChanged(event: MatCheckboxChange, theme: ITheme) {
    if (!this.groupsemester || !theme) return;

    const {id, name, short_name} = theme;
    if (event.checked && !this.groupsemester.themes.find(item => item.id === id))
      this.groupsemester.themes.push({id, name, short_name});
    if (!event.checked && !!this.groupsemester.themes.find(item => item.id === id))
      this.groupsemester.themes = this.groupsemester.themes.filter(item => item.id !== id);

    this._needUpdate.next();
  }

  public lessonTimeChanged(event: MatCheckboxChange, lessonTime: ILessonTime) {
    if (!this.groupsemester || !lessonTime) return;

    const {id, end, num, start} = lessonTime;
    if (event.checked && !this.groupsemester.lessons_time.find(item => item.id === id))
      this.groupsemester.lessons_time.push({id, end, num, start});
    if (!event.checked && !!this.groupsemester.lessons_time.find(item => item.id === id))
      this.groupsemester.lessons_time = this.groupsemester.lessons_time.filter(item => item.id !== id);

    this._needUpdate.next();
  }

  public deleteGroupSemester(): void {
    if (!this.groupsemester) return;

    this.popupService.openDialog({header: 'Вилучити семестр?'},
      () => this.groupsemesterService.deleteGroupSemester(this.groupsemester.id)
        .pipe(takeUntil(this._unsubscribeDeleting))
        .subscribe(() => this.delete.emit(this.groupsemester.id)));
  }

  private _updateGroupsemesters(): void {
    if (!this.groupsemester) return;

    this._unsubscribeUpdating.next();
    this.groupsemesterService.updateGroupsemester(this.groupsemester)
      .pipe(takeUntil(this._unsubscribeUpdating))
      .subscribe(updated => this.groupsemester = updated, () => this.groupsemester = this._initialGroupsemester);
  }
}
