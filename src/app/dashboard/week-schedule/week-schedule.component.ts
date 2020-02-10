import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { GroupSelectComponent } from '@app/shared/menu-select/group-select/group-select.component';
import { Lesson } from '@classes/lesson';
import { WeekSchedule } from '@classes/week-schedule';
import { ICreateLessonBody, ILesson } from '@interfaces';
import { switchMap } from 'rxjs/operators';
import { FormatService } from 'src/app/service/format/format.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';

@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.scss'],
})
export class WeekScheduleComponent implements OnInit {
  public isDragging = false;
  public draggedLesson: Lesson = undefined;
  public clipboard: Lesson;
  public groupIdControl: FormControl = new FormControl(undefined);
  public isLoading = false;
  public weekSchedule: WeekSchedule;
  @ViewChild(GroupSelectComponent, {static: true}) private _groupSelector: GroupSelectComponent;
  private _groupSlug = this.route.snapshot.paramMap.get('groupSlug');
  private _groupsemester: number;

  constructor(private scheduleService: ScheduleService,
              private lessonService: LessonService,
              private route: ActivatedRoute,
              private formatService: FormatService,
              private popupService: PopupService,
              private router: Router) {}

  public ngOnInit(): void {
    this.groupIdControl.valueChanges
      .subscribe(id => this._getNextUrl(id));

    this.scheduleService.getActualSchedule$()
      .subscribe(res => {
        this.weekSchedule = res;
        if (res) this.groupIdControl.patchValue(res.getScheduleGroupId());
        this._getGroupsemester();
        this.isLoading = false;
      });

    this._updatePage();
  }

  public openLessonDetail(lesson: Lesson) {
    this.popupService.openModal(['lesson', this._groupSlug, lesson.id], () => this._updatePage(true), null);
  }

  public openAddLessonModal(time: number, day: number) {
    this.popupService.openModal(['add-lesson', this._groupSlug, day, time], () => this._updatePage(true), null);
  }

  public delete(lessonId: number) {
    this.popupService.openDialog({header: 'Видалити пару?', body: 'Видалення має невідворотню силу'},
      () => (this.isLoading = true) && this.scheduleService.deleteLesson(lessonId)
        .subscribe(() => this._updatePage(true)));
  }

  public moveLesson(lessonId: number, time: number, day: number) {
    this.isLoading = true;
    this.lessonService.getLesson(lessonId) // todo remove get lesson from server
      .pipe(switchMap(lesson => this.scheduleService.updateLesson(this._formatCreateLessonBody(lesson, time, day), lesson.id)))
      .subscribe(() => this._updatePage(true));
  }

  public pasteLesson(time: number, day: number) {
    this.isLoading = true;
    this.lessonService.getLesson(this.clipboard.id) // todo remove get lesson from server
      .pipe(switchMap(lesson => this.scheduleService.createLesson(this._formatCreateLessonBody(lesson, time, day))))
      .subscribe(() => this._updatePage(true));
  }

  private _formatCreateLessonBody(lesson: ILesson, lesson_time: number, day: number): ICreateLessonBody {
    return {
      ...lesson,
      teachers: lesson.teachers.toString(),
      lesson_time,
      day,
      group_semester: this._groupsemester,
    } as ICreateLessonBody;
  }

  private _getNextUrl(groupId: number): void {
    const group = this._groupSelector.getOptionById(groupId);
    if (!!group && (!this.weekSchedule || this.weekSchedule.getScheduleGroupId() !== groupId)) {
      this.router.navigate(['dashboard', 'lessons-schedule', group.slug])
        .then(() => this._updatePage());
      this._groupSlug = group.slug;
    }
  }

  private _updatePage(isForce: boolean = false) {
    if (this._groupSlug === 'groupSlug') return;

    this.isLoading = true;
    this.scheduleService.getTimetable(this._groupSlug, isForce);
  }

  private _getGroupsemester() {
    if (this.weekSchedule)
      this.scheduleService.getGroupSemester(this.weekSchedule.getScheduleGroupId(), this.weekSchedule.getScheduleSemesterId())
        .subscribe(res => this._groupsemester = res && res.count ? res.results[0].id : undefined);
  }
}
