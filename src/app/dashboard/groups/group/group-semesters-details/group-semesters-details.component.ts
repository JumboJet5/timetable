import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { accordionTransitionAnimation } from '@animations/accordion.animation';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { ThemeService } from '@app/service/theme/theme.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IGroup } from 'src/core/interfaces/group.interface';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-group-semesters-details',
  templateUrl: './group-semesters-details.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './group-semesters-details.component.scss'],
  animations: [accordionTransitionAnimation],
})
export class GroupSemestersDetailsComponent implements OnInit {
  public groupsemesters: IGroupsemester[];
  public groupsemesterMap: Map<number, IGroupsemester> = new Map<number, IGroupsemester>();
  public groupThemes: ITheme[];
  public lessonTimes: ILessonTime[];
  public semesterMap: Map<number, ISemester> = new Map<number, ISemester>();
  public openedId: number;
  private _needUpdate: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor(private groupsemesterService: GroupsemesterService,
              private semesterService: SemesterService,
              private lessonTimeService: LessonTimeService,
              private themeService: ThemeService) { }

  private _group: IGroup;

  public get group(): IGroup {
    return this._group;
  }

  @Input()
  public set group(value: IGroup) {
    this._group = value;
    if (!!this._group) this._getAllGroupSemestersAdditionalInfo(this._group.id);
  }

  ngOnInit(): void {
    this._needUpdate.asObservable()
      .pipe(debounceTime(5000))
      .subscribe(console.log);
  }

  public isThemeEnableForGroupsemester(themeId: number, groupsemester: IGroupsemester): boolean {
    return !!groupsemester && !!groupsemester.themes && groupsemester.themes.some(theme => theme.id === themeId);
  }

  public isLessonTimeEnableForGroupsemester(lessonTimeId: number, groupsemester: IGroupsemester): boolean {
    return !!groupsemester && !!groupsemester.lessons_time && groupsemester.lessons_time.some(lessonTime => lessonTime.id === lessonTimeId);
  }

  public toggleGroupSemester(id: number) {
    this.openedId = id === this.openedId ? undefined : id;
  }

  public themeChanged(event: MatCheckboxChange, theme: ITheme, groupSemester: IGroupsemester) {
    if (!groupSemester || !theme) return;

    if (event.checked && !groupSemester.themes.find(item => item.id === theme.id))
      groupSemester.themes.push(theme);
    if (!event.checked && !!groupSemester.themes.find(item => item.id === theme.id))
      groupSemester.themes = groupSemester.themes.filter(item => item.id !== theme.id);

    this._addToUpdateQueue(groupSemester.id);
  }

  private _addToUpdateQueue(groupsemesterId: number): void {
    const currQueue = this._needUpdate.value;
    this._needUpdate.next(currQueue.includes(groupsemesterId) ? currQueue : [...currQueue, groupsemesterId]);
  }

  private _getAllGroupSemestersAdditionalInfo(group: number) {
    this.themeService.getThemes({group})
      .subscribe(res => this.groupThemes = res.results);

    this.groupsemesterService.getGroupSemester(group)
      .subscribe(res => this.groupsemesters = res.results)
      .add(() => {
        this.groupsemesterMap = new Map<number, IGroupsemester>();
        this.groupsemesters.forEach(groupsemester => this.groupsemesterMap.set(groupsemester.id, {...groupsemester}));
      });

    this.semesterService.getSemesters({group})
      .subscribe(res => res.results.forEach(semester => this.semesterMap.set(semester.id, semester)));

    this.lessonTimeService.getLessonTimes({group})
      .subscribe(res => this.lessonTimes = res.results);
  }
}
