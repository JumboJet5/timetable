import { CdkDrag, CdkDragDrop, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Host, Input, OnInit, ViewChild } from '@angular/core';
import { lessonFormatMap } from 'src/core/const/collections';
import { Lesson } from '../../../../core/classes/lesson';
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
  @ViewChild(CdkDropList, {static: false}) dropList: CdkDropList;
  public lessons: Lesson[] = [];
  public lessonTypesMap: Map<number, LessonFormatInterface> = lessonFormatMap();
  public isPlaced = false;

  constructor(@Host() public parent: WeekScheduleComponent) {
  }

  public ngOnInit(): void {
    this.lessons = this.parent.weekSchedule.getConcreteLessons(this.day, this.timeId);
  }

  public isLessonNotSpecified(): (data: CdkDrag) => boolean {
    return (data: CdkDrag) => !!data.data && this.lessons.every(lesson => lesson.hasLessonsInsertConflicts(data.data));
  }

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
