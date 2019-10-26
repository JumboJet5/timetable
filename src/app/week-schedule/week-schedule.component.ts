import { CdkDropList } from '@angular/cdk/drag-drop';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormatService } from 'src/app/service/format/format.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { ScheduleLessonsComponent } from 'src/app/week-schedule/schedule-lessons/schedule-lessons.component';

@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.scss'],
})
export class WeekScheduleComponent implements OnInit {
  public dropLists: CdkDropList[] = [];
  public isDragging = false;
  public weekDays = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];
  public lessonTimes: LessonTimeInterface[] = [];
  public week = this.lessonTimes.map(() => this.weekDays.map(() => []));
  public clipboard: LessonInterface;
  public groupIdControl: FormControl = new FormControl(undefined);

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private formatService: FormatService,
              private router: Router) {}

  @ViewChildren(ScheduleLessonsComponent)
  public set lessons(value: QueryList<ScheduleLessonsComponent>) {
    setTimeout(() => this.dropLists = value.toArray().map(lesson => lesson.dropList));
  }

  private updatePage() {
    const snapshotParams = this.route.snapshot.paramMap;
    if (snapshotParams.has('groupSlug') && snapshotParams.get('groupSlug') !== 'groupSlug') {
      this.groupIdControl.patchValue(+snapshotParams.get('groupId'));
      this.scheduleService.getTimetable(snapshotParams.get('groupSlug'))
        .subscribe(res => this.initSchedule(res));
    }
  }

  private initSchedule(schedule: TimetableInterface) {
    this.lessonTimes = schedule.lesson_time;
    this.week = this.lessonTimes
      .map(() => this.weekDays.map(() => []));
    schedule.lessons
      .forEach(lesson => this.addLessonToSchedule(lesson));
  }

  private addLessonToSchedule(lesson: LessonInterface) {
    const day = this.formatService.getLessonDay(lesson);
    const index = this.lessonTimes
      .findIndex(time => time.id === lesson.lesson_time);
    if (index > -1 && day > -1) {
      this.week[index][day].push(lesson);
    }
  }

  public ngOnInit(): void {
    this.updatePage();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updatePage());
  }

  public loadGroups = (option: LoadPageInterface): Observable<GroupsResponseInterface> => this.scheduleService.getGroups({...option});

  public loadGroup = (id: number): Observable<GroupInterface> => this.scheduleService.getGroup(id);

  public paste(lesson: ScheduleLessonsComponent, index: number) {
    lesson.lessons[index] = this.clipboard || lesson.lessons[index];
    this.clipboard = undefined;
  }

  public changeSlug($event: OptionInterface[]) {
    this.router.navigate([$event[0].slug, $event[0].id]);
  }

  public openLessonDetail(lesson: LessonInterface, state: LessonInterface[]) {
    this.router.navigate([{outlets: {modal: ['modal', 'lesson', lesson.id]}}], {state: {state}});
  }
}
