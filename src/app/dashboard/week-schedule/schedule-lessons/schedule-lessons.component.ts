import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { lessonFormatMap } from 'src/core/const/collections';
import { Lesson } from '../../../../core/classes/lesson';
import { WeekSchedule } from '../../../../core/classes/week-schedule';

@Component({
  selector: 'app-schedule-lessons',
  templateUrl: './schedule-lessons.component.html',
  styleUrls: ['./schedule-lessons.component.scss'],
})
export class ScheduleLessonsComponent {
  @Output() public dropEnd: EventEmitter<CdkDragDrop<Lesson[], any>> = new EventEmitter();
  @Output() public dragStart: EventEmitter<CdkDragStart> = new EventEmitter();
  @Output() public dragEnd: EventEmitter<CdkDragEnd> = new EventEmitter();
  @Output() public addToClipBoard: EventEmitter<Lesson> = new EventEmitter();
  @Output() public onLessonClick: EventEmitter<Lesson> = new EventEmitter();
  @Output() public onAddLesson: EventEmitter<void> = new EventEmitter();
  @Output() public onPasteLesson: EventEmitter<void> = new EventEmitter();
  @Input() public lessons: Lesson[];
  @Input() public schedule: WeekSchedule;
  @Input() public isSomeDragging: boolean;
  @Input() public draggedLesson: Lesson;
  @Input() public clipboardData: Lesson;
  @Output() public deleteLesson: EventEmitter<number> = new EventEmitter<number>();
  @Output() public moveLesson: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild(CdkDropList, {static: false}) dropList: CdkDropList;
  public lessonTypesMap: Map<number, LessonFormatInterface> = lessonFormatMap();
  public isPlaced = false;

  public isLessonNotSpecified(): (data: CdkDrag) => boolean {
    return (data: CdkDrag) => !!data.data && this.lessons.every(lesson => lesson.hasLessonsInsertConflicts(data.data));
  }

  drop(event: CdkDragDrop<Lesson[], any>) {
    if (event.previousContainer === event.container) moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.moveLesson.emit(event.item.data.id);
    }
    this.dropEnd.emit(event);
    this.isPlaced = false;
  }
}
