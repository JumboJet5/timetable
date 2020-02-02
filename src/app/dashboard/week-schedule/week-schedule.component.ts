import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { FormatService } from 'src/app/service/format/format.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { WeekSchedule } from '../../../core/classes/week-schedule';
import { Lesson } from '../../../core/classes/lesson';

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
  private _groupSlug: string;
  private _groupsemester: number;

  constructor(private scheduleService: ScheduleService,
              private lessonService: LessonService,
              private route: ActivatedRoute,
              private formatService: FormatService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this._updatePage();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd && !/\(modal/.test(event.url)))
      .subscribe(() => this._updatePage());
  }

  public loadGroups = (option: LoadPageInterface): Observable<GroupsResponseInterface> => this.scheduleService.getGroups({...option});

  public loadGroup = (id: number): Observable<GroupInterface> => this.scheduleService.getGroup(id);

  public changeSlug(event: OptionInterface[]) {
    if (event && event.length) this.router.navigate(['dashboard', 'lessons-schedule', event[0].slug, event[0].id]);
  }

  public openLessonDetail(lesson: Lesson, associatedLessons: Lesson[]) {
    const state = {
      associatedLessons,
      groupSchedule: this.weekSchedule.getSchedule(),
      groupsemester: this._groupsemester
    };
    this.router.navigate([{outlets: {modal: ['modal', 'lesson', lesson.id, this._groupSlug]}}], {state: {state}});
  }

  public openAddLessonModal(time: number, day: number) {
    const state = {day, time, groupSchedule: this.weekSchedule.getSchedule(), groupsemester: this._groupsemester};
    this.router.navigate([{outlets: {modal: ['modal', 'lesson', this._groupSlug]}}], {state: {state}});
  }

  public delete(lessonId: number) {
    this.isLoading = true;
    this.scheduleService.deleteLesson(lessonId)
      .subscribe(() => this._updatePage());
  }

  public moveLesson(lessonId: number, time: number, day: number) {
    this.isLoading = true;
    this.lessonService.getLesson(lessonId) // todo remove get lesson from server
      .pipe(switchMap(lesson => this.scheduleService.updateLesson({
        theme: lesson.theme.toString(),
        format: lesson.format.toString(),
        weeks: lesson.weeks,
        room: lesson.room.toString(),
        teachers: lesson.teachers.map(teacher => teacher.toString()),
        lesson_time: time.toString(),
        day: day.toString(),
        group_semester: this._groupsemester.toString(),
      }, lesson.id)))
      .subscribe(() => this._updatePage());
  }

  public pasteLesson(time: number, day: number) {
    this.isLoading = true;
    this.lessonService.getLesson(this.clipboard.id) // todo remove get lesson from server
      .pipe(switchMap(lesson => this.scheduleService.createLesson({
        theme: lesson.theme.toString(),
        format: lesson.format.toString(),
        weeks: lesson.weeks,
        room: lesson.room.toString(),
        teachers: lesson.teachers.map(teacher => teacher.toString()),
        lesson_time: time.toString(),
        day: day.toString(),
        group_semester: this._groupsemester.toString(),
      })))
      .subscribe(() => this._updatePage());
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
    this.scheduleService.getGroupSemester(this.weekSchedule.getScheduleGroupId(), this.weekSchedule.getScheduleSemesterId())
      .subscribe(res => this._groupsemester = res && res.count ? res.results[0].id : undefined);
  }
}
