import { CdkDragDrop, CdkDragSortEvent, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Host, Input, OnInit, ViewChild } from '@angular/core';
import { Lesson } from '@classes/lesson';
import { lessonTypesMap } from '@const/collections';
import { LessonFormatInterface } from 'src/core/interfaces/lesson-format.interface';
import { WeekScheduleComponent } from '../week-schedule.component';

@Component({
  selector: 'app-schedule-lessons',
  templateUrl: './schedule-lessons.component.html',
  styleUrls: ['./schedule-lessons.component.scss'],
})
export class ScheduleLessonsComponent implements OnInit {
  @Input() public day: string;
  @Input() public dayIndex: number;
  @Input() public timeId: number;
  @ViewChild(CdkDropList) dropList: CdkDropList;
  public lessons: Lesson[] = [];
  public lessonTypesMap: Map<number, LessonFormatInterface> = lessonTypesMap();
  public isPlaced = false;

  constructor(@Host() public parent: WeekScheduleComponent) {
  }

  public ngOnInit(): void {
    this.lessons = this.parent.weekSchedule.getConcreteLessons(this.day, this.timeId);
  }

  // todo add temporary week vacant filter
  // public isLessonNotSpecified(): (data: { data: Lesson }) => boolean {
  //   return (data: { data: Lesson }) => !!data.data && this.lessons.every(
  //     lesson => lesson.hasLessonsInsertConflicts(data.data));
  // }

  public drop(event: CdkDragDrop<Lesson[], any>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, this.parent.weekSchedule.sortLessons(event.container.data),
        event.previousIndex, event.currentIndex);
      this.parent.moveLesson(event.item.data.id, this.timeId, this.dayIndex);
    }
    this.isPlaced = false;
  }

  public onDragEnd(): void {
    this.parent.isDragging = false;
    this.parent.draggedLesson = null;
  }

  public onDragStart(draggedLesson: Lesson): void {
    this.parent.isDragging = true;
    this.parent.draggedLesson = draggedLesson;
    this.isPlaced = true;
  }
}
