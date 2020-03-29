import { Component, Input, OnInit } from '@angular/core';
import { accordionTransitionAnimation } from '@animations/accordion.animation';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { ThemeService } from '@app/service/theme/theme.service';
import { IGroup } from 'src/core/interfaces/group.interface';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-group-semesters-details',
  templateUrl: './group-semesters-details.component.html',
  styleUrls: ['./group-semesters-details.component.scss'],
  animations: [accordionTransitionAnimation],
})
export class GroupSemestersDetailsComponent implements OnInit {
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
  }

  private _getAllGroupSemestersAdditionalInfo(group: number) {
    this.themeService.getThemes({group})
      .subscribe(res => this.groupThemes = res.results);

    this.groupsemesterService.getGroupsemester(group)
      .subscribe(res => this.groupsemesters = res.results);

    this.semesterService.getSemesters({group})
      .subscribe(res => res.results.forEach(semester => this.semesterMap.set(semester.id, semester)));

    this.lessonTimeService.getLessonTimes({group})
      .subscribe(res => this.lessonTimes = res.results);
  }

  public onDelete(index: number) {
    this.groupsemesters.splice(index, 1);
  }
}
