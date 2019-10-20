import { CdkDropList } from '@angular/cdk/drag-drop';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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

  constructor(private scheduleService: ScheduleService) {}

  @ViewChildren(ScheduleLessonsComponent)
  public set lessons(value: QueryList<ScheduleLessonsComponent>) {
    setTimeout(() => this.dropLists = value.toArray().map(lesson => lesson.dropList));
  }

  public loadGroups = (option: LoadPageInterface): Observable<GroupsResponseInterface> => this.scheduleService.getGroups({...option});

  public loadGroup = (id: number): Observable<GroupInterface> => this.scheduleService.getGroup(id);

  public ngOnInit(): void {}

  public paste(lesson: ScheduleLessonsComponent, index: number) {
    lesson.lessons[index] = this.clipboard || lesson.lessons[index];
    this.clipboard = undefined;
  }

  public changeSlug($event: OptionInterface[]) {
    this.scheduleService.getTimetable($event[0].slug)
      .subscribe(res => {
        this.lessonTimes = res.lesson_time;
        this.week = this.lessonTimes.map(() => this.weekDays.map(() => []));
        res.lessons.forEach(lesson => {
          const day = lesson.dates && lesson.dates.length ? new Date(lesson.dates[0]).getDay() - 1 : -1;
          const index = res.lesson_time.findIndex(time => time.id === lesson.lesson_time);
          if (index > -1 && day > -1) {
            this.week[index][day].push(lesson);
          }
        });
      });
  }
}
