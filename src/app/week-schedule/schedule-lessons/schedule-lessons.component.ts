import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragStart, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-schedule-lessons',
  templateUrl: './schedule-lessons.component.html',
  styleUrls: ['./schedule-lessons.component.scss'],
})
export class ScheduleLessonsComponent {
  @Output() public dropEnd: EventEmitter<CdkDragDrop<string[]>> = new EventEmitter();
  @Output() public dragStart: EventEmitter<CdkDragStart> = new EventEmitter();
  @Output() public dragEnd: EventEmitter<CdkDragEnd> = new EventEmitter();
  @Output() public addToClipBoard: EventEmitter<string> = new EventEmitter();
  @Output() public getFromClipBoard: EventEmitter<number> = new EventEmitter();
  @Input() public lessons: LessonInterface[];
  @Input() public connectedList: any[];
  @Input() public isSomeDragging: any[];
  @Input() public clipboardData: LessonInterface;
  @ViewChild(CdkDropList, {static: false}) dropList: CdkDropList;
  public isPlaced = false;
  private index = 0;

  private isDifferentSubgroups(lesson1: LessonInterface, lesson2: LessonInterface): boolean {
    return !!lesson1.subgroup && !!lesson2.subgroup && lesson1.subgroup !== lesson2.subgroup;
  }

  private isDifferentSchedule(weeks1: boolean[], weeks2: boolean[]): boolean {
    return weeks1.every((item, i) => !item || item !== weeks2[i]);
  }

  private isSameName(lesson1: LessonInterface, lesson2: LessonInterface): boolean {
    return !lesson1.subgroup && !lesson2.subgroup && lesson1.name_full === lesson2.name_full;
  }

  public isLessonNotSpecified(): (data: CdkDrag) => boolean {
    return (data: CdkDrag) => {
      if (data.data) {
        const lessonsWeeks = this.lessons.map(lesson => lesson.weeks.split('')
          .map(week => !!+week));
        const draggedWeeks = data.data.weeks.split('')
          .map(week => !!+week);
        return !lessonsWeeks.length || lessonsWeeks
          .every((weeks, lessonIndex) => this.isDifferentSchedule(weeks, draggedWeeks)
            || this.isDifferentSubgroups(this.lessons[lessonIndex], data.data) || this.isSameName(this.lessons[lessonIndex], data.data));
      } else {
        return false;
      }
    };
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.isPlaced = false;
    this.dropEnd.emit(event);
  }

  public addLesson() {
    // this.clipboardData ? this.getFromClipBoard.emit(0) : this.lessons.push('new Item');
  }

  public edit(index) {
    this.lessons[index].name_short += ++this.index;
  }
}
