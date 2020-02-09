import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { GroupSelectComponent } from '@app/shared/menu-select/group-select/group-select.component';
import { Lesson } from '@classes/lesson';
import { WeekSchedule } from '@classes/week-schedule';
import { ICreateLessonBody } from '@interfaces';
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
  public weekSchedule: WeekSchedule = new WeekSchedule();
  @ViewChild(GroupSelectComponent) private _groupSelector: GroupSelectComponent;
  private _groupSlug: string;
  private _groupsemester: number;

  constructor(private scheduleService: ScheduleService,
              private lessonService: LessonService,
              private route: ActivatedRoute,
              private formatService: FormatService,
              private popupService: PopupService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this._updatePage();

    this.groupIdControl.valueChanges
      .subscribe(id => this._getNextUrl(id));
  }

  public openLessonDetail(lesson: Lesson, associatedLessons: Lesson[]) {
    const state = {
      associatedLessons,
      groupSchedule: this.weekSchedule.getSchedule(),
      groupsemester: this._groupsemester
    };
    this.popupService.openModal(['lesson', '' + lesson.id, this._groupSlug], () => this._updatePage(), null, state);
  }

  public openAddLessonModal(time: number, day: number) {
    const state = {day, time, groupSchedule: this.weekSchedule.getSchedule(), groupsemester: this._groupsemester};
    this.popupService.openModal(['lesson', this._groupSlug], () => this._updatePage(), null, state);
  }

  public delete(lessonId: number) {
    this.popupService.openDialog({header: 'Видалити пару?', body: 'Видалення має невідворотню силу'},
      () => (this.isLoading = true) && this.scheduleService.deleteLesson(lessonId)
        .subscribe(() => this._updatePage()));
  }

  public moveLesson(lessonId: number, lesson_time: number, day: number) {
    this.isLoading = true;
    this.lessonService.getLesson(lessonId) // todo remove get lesson from server
      .pipe(switchMap(lesson => this.scheduleService.updateLesson({
        ...lesson,
        teachers: lesson.teachers.toString(),
        lesson_time,
        day,
        group_semester: this._groupsemester,
      } as ICreateLessonBody, lesson.id)))
      .subscribe(() => this._updatePage());
  }

  public pasteLesson(lesson_time: number, day: number) {
    this.isLoading = true;
    this.lessonService.getLesson(this.clipboard.id) // todo remove get lesson from server
      .pipe(switchMap(lesson => this.scheduleService.createLesson({
        ...lesson,
        teachers: lesson.teachers.toString(),
        lesson_time,
        day,
        group_semester: this._groupsemester,
      } as ICreateLessonBody)))
      .subscribe(() => this._updatePage());
  }

  private _getNextUrl(groupId: number): void {
    if (this._groupSelector.getOptionById(groupId))
      this.router.navigate([
        'dashboard',
        'lessons-schedule',
        this._groupSelector.getOptionById(groupId).slug,
        '' + groupId
      ]);
  }

  private _updatePage() {
    const isSlugChanged = !this._groupSlug || this._groupSlug !== this.route.snapshot.paramMap.get('groupSlug');
    this._groupSlug = this.route.snapshot.paramMap.get('groupSlug');
    if (this._groupSlug !== 'groupSlug') {
      this.isLoading = true;
      this.groupIdControl.patchValue(+this.route.snapshot.paramMap.get('groupId'));
      this.scheduleService.getTimetable(this._groupSlug)
        .subscribe(res => this.weekSchedule = new WeekSchedule(res))
        .add(() => isSlugChanged ? this._getGroupsemester() : null)
        .add(() => this.isLoading = false);
    }
  }

  private _getGroupsemester() {
    this.scheduleService.getGroupSemester(this.weekSchedule.getScheduleGroupId(),
      this.weekSchedule.getScheduleSemesterId())
      .subscribe(res => this._groupsemester = res && res.count ? res.results[0].id : undefined);
  }
}
