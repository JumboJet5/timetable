import { CdkDropList } from '@angular/cdk/drag-drop';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ScheduleLessonComponent } from 'src/app/week-schedule/schedule-lesson/schedule-lesson.component';

@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.scss'],
})
export class WeekScheduleComponent implements OnInit {
  public dropLists: CdkDropList[] = [];
  public isDragging = false;
  public weekDays = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця'];
  public lessonTimes = [1, 2, 3, 4];
  public week = this.weekDays.map(() => this.lessonTimes.map(() => []));
  clipboard: string;

  @ViewChildren(ScheduleLessonComponent)
  public set lessons(value: QueryList<ScheduleLessonComponent>) {
    setTimeout(() => this.dropLists = value.toArray().map(lesson => lesson.dropList));
  }

  public ngOnInit(): void {}

  public paste(lesson: ScheduleLessonComponent, index: number) {
    lesson.lessons[index] = this.clipboard || lesson.lessons[index];
    this.clipboard = undefined;
  }
}
