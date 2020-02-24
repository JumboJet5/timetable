import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { GroupSelectComponent } from '@app/shared/menu-select/group-select/group-select.component';
import { Lesson } from '@classes/lesson';
import { WeekSchedule } from '@classes/week-schedule';
import { degreeMap } from '@const/collections';
import { environment } from '@environment/environment';
import { ICreateLessonBody, ILesson } from '@interfaces';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';

@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.scss'],
})
export class WeekScheduleComponent implements OnInit, OnDestroy {
  public isHeaderAlwaysClosed = environment.production;
  public degreeMap = degreeMap();
  public isDragging = false;
  public draggedLesson: Lesson = undefined;
  public clipboard: Lesson;
  public groupIdControl: FormControl = new FormControl(undefined);
  public isLoading = false;
  public weekSchedule: WeekSchedule;
  @ViewChild(GroupSelectComponent, {static: true}) private _groupSelector: GroupSelectComponent;
  private _groupSlug = this.route.snapshot.paramMap.get('groupSlug');
  private _groupsemester: number;
  private _unsubscribe: Subject<void> = new Subject<void>();

  constructor(private scheduleService: ScheduleService,
              private lessonService: LessonService,
              private route: ActivatedRoute,
              private popupService: PopupService,
              private router: Router) {}

  public ngOnInit(): void {
    this._updatePage();

    this.groupIdControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(slug => this._getNextUrl(slug));

    this.scheduleService.getActualSchedule$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(res => {
        if (res && res.getScheduleGroup() && res.getScheduleGroup().slug === this._groupSlug)  {
          this.weekSchedule = res;
          this._getGroupsemester();
        }
        this.isLoading = false;
      });

    this.router.events
      .pipe(takeUntil(this._unsubscribe))
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this._updatePage();
        this._groupSlug = this.route.snapshot.paramMap.get('groupSlug');
      });
  }

  public openLessonDetail(lesson: Lesson) {
    this.popupService.openModal(['lesson', this._groupSlug, lesson.id], () => this._updatePage(true), null);
  }

  public openAddLessonModal(time: number, day: number) {
    this.popupService.openModal(['add-lesson', this._groupSlug, day, time, this._groupsemester],
      () => this._updatePage(true),
      null);
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

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _formatCreateLessonBody(lesson: ILesson, lesson_time: number, day: number): ICreateLessonBody {
    const teachers = lesson.teachers.map(teacher => teacher.toString());
    return {
      ...lesson,
      teachers,
      lesson_time,
      day,
      group_semester: this._groupsemester,
    } as ICreateLessonBody;
  }

  private _getNextUrl(groupSlug: string): void {
    if (groupSlug !== this.route.snapshot.paramMap.get('groupSlug'))
      this.router.navigate(['dashboard', 'lessons-schedule', groupSlug || 'groupSlug'])
        .then(() => this._updatePage());
  }

  private _updatePage(isForce: boolean = false) {
    if (!this.groupIdControl.value || this._groupSlug === this.groupIdControl.value) return;

    this.isLoading = true;
    this.groupIdControl.patchValue(this.route.snapshot.paramMap.get('groupSlug'));
    this.scheduleService.getTimetable(this.route.snapshot.paramMap.get('groupSlug'), isForce);
  }

  private _getGroupsemester() {
    if (this.weekSchedule)
      this.scheduleService.getGroupSemester(this.weekSchedule.getScheduleGroupId(), this.weekSchedule.getScheduleSemesterId())
        .subscribe(res => this._groupsemester = res && res.count ? res.results[0].id : undefined);
  }
}
