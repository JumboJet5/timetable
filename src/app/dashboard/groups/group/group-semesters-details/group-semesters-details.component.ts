import { Component, Input, OnInit } from '@angular/core';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { ThemeService } from '@app/service/theme/theme.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IGroup } from 'src/core/interfaces/group.interface';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-group-semesters-details',
  templateUrl: './group-semesters-details.component.html',
  styleUrls: ['./group-semesters-details.component.scss'],
})
export class GroupSemestersDetailsComponent implements OnInit {
  @Input() facultyId: number;
  public groupsemesters: IGroupsemester[];
  public groupThemes: ITheme[];
  public lessonTimes: ILessonTime[];
  public semesterMap: Map<number, ISemester> = new Map<number, ISemester>();

  constructor(private groupsemesterService: GroupsemesterService,
              private semesterService: SemesterService,
              private popupService: PopupService,
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
    this.popupService.getChanel(PopupChanelEnum.ADD_SEMESTER_TO_GROUP)
      .subscribe((res: IGroupsemester) => this._addGroupsemester(res));
    this.popupService.getChanel(PopupChanelEnum.CREATE_SEMESTER)
      .subscribe((res: ISemester) => this._addSemesterToGroup(res));
    this.popupService.getChanel(PopupChanelEnum.CREATE_LESSONTIME)
      .subscribe((res: ILessonTime) => this.lessonTimes.push(res));
  }

  public onDelete(index: number) {
    this.groupsemesters.splice(index, 1);
  }

  public addSemester(): void {
    if (!!this.group) this.popupService.openReactiveModal(['add-semester-to-group'],
      {group: this.group.id});
  }

  public createSemester() {
    if (!!this.group) this.popupService.openReactiveModal(['create-semester'], {year: this.group.year});
  }

  private _addSemesterToGroup(semester: ISemester): void {
    if (!semester || !this.group) return;

    this.semesterMap.set(semester.id, semester);
    this.groupsemesterService.createGroupsemester({
      semester: semester.id,
      group: this.group.id,
      show_lessons_number: true,
      lessons_time: [],
      themes: [],
    })
      .subscribe(res => this._addGroupsemester(res));
  }

  private _addGroupsemester(groupsemester: IGroupsemester): void {
    this.groupsemesters.push(groupsemester);
  }

  private _getAllGroupSemestersAdditionalInfo(group: number) {
    this.themeService.getThemes({group})
      .subscribe(res => this.groupThemes = res.results);

    this.groupsemesterService.getGroupsemesters(group)
      .subscribe(res => this.groupsemesters = res.results);

    this.semesterService.getSemesters({group})
      .subscribe(res => res.results.forEach(semester => this.semesterMap.set(semester.id, semester)));

    this.lessonTimeService.getLessonTimes({group})
      .subscribe(res => this.lessonTimes = res.results);
  }
}
