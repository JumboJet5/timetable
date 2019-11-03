import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragStart, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormatService } from 'src/app/service/format/format.service';

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
  @Output() public onLessonClick: EventEmitter<LessonInterface> = new EventEmitter();
  @Input() public lessons: LessonInterface[];
  @Input() public connectedList: any[];
  @Input() public isSomeDragging: any[];
  @Input() public clipboardData: LessonInterface;
  @ViewChild(CdkDropList, {static: false}) dropList: CdkDropList;
  public lessonTypesMap = new Map([
    [0, 'л.'],
    [1, 'с.'],
    [2, 'пр.'],
    [3, 'лаб.'],
    [4, 'інше'],
  ]);
  public isPlaced = false;
  private index = 0;

  constructor(private formatService: FormatService) {}

  private isDifferentSchedule(weeks1: boolean[], weeks2: boolean[]): boolean {
    return weeks1.every((item, i) => !item || item !== weeks2[i]);
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
            || this.formatService.isDifferentSubgroups(this.lessons[lessonIndex], data.data)
            || this.formatService.isSameName(this.lessons[lessonIndex], data.data));
      } else {
        return false;
      }
    };
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.isPlaced = false;
    this.dropEnd.emit(event);
  }

  public addLesson() {
    // this.clipboardData ? this.getFromClipBoard.emit(0) : this.lessons.push('new Item');
  }

  public edit(index) {
    this.lessons[index].name_short += ++this.index;
    return false;
  }

  getWeeks(lesson: LessonInterface): string {
    return lesson.weeks.split('')
      .map(bite => !!+bite)
      .reduce((weeksSequence, isLesson, index, weeksBool) => {
        if (isLesson) {
          if (!weeksSequence) {
            weeksSequence = (index + 1).toString();
          } else {
            if (!weeksBool[index - 1]) {
              weeksSequence += ', ' + (index + 1);
            } else if (index === weeksBool.length - 1) {
              weeksSequence += '-' + (index + 1);
            }
          }
        } else if (weeksBool[index - 1] && weeksBool[index - 2]) {
          weeksSequence += '-' + index;
        }
        return weeksSequence;
      }, '');
  }

  public copy(lesson) {
    this.addToClipBoard.emit(lesson);
    console.log('here')
    return false;
  }

  public paste(i: number) {
    this.getFromClipBoard.emit(i);
    return false;
  }

  public log() {
    console.log('wer')
  }
}
