import { CdkDragDrop, CdkDragEnd, CdkDragStart, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-schedule-lesson',
  templateUrl: './schedule-lesson.component.html',
  styleUrls: ['./schedule-lesson.component.scss'],
})
export class ScheduleLessonComponent {
  @Output() public dropEnd: EventEmitter<CdkDragDrop<string[]>> = new EventEmitter();
  @Output() public dragStart: EventEmitter<CdkDragStart> = new EventEmitter();
  @Output() public dragEnd: EventEmitter<CdkDragEnd> = new EventEmitter();
  @Output() public addToClipBoard: EventEmitter<string> = new EventEmitter();
  @Output() public getFromClipBoard: EventEmitter<number> = new EventEmitter();
  @Input() public lessons: any[];
  @Input() public connectedList: any[];
  @Input() public isSomeDragging: any[];
  @Input() public isSomethingInClipboard: boolean;
  @ViewChild(CdkDropList, {static: false}) dropList: CdkDropList;
  public isPlaced = false;
  private index = 0;

  public isLessonNotSpecified: () => boolean = () => !this.lessons || this.lessons.length < 2;

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
    this.isSomethingInClipboard ? this.getFromClipBoard.emit(0) : this.lessons.push('new Item');
  }

  public edit(index) {
    this.lessons[index] = 'item' + ++this.index;
  }
}
