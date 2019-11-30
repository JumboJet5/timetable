import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragStart, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormatService } from 'src/app/service/format/format.service';
// @ts-ignore
import { lessonFormatMap } from 'src/core/const/collections';

@Component({
    selector: 'app-schedule-lessons',
    templateUrl: './schedule-lessons.component.html',
    styleUrls: ['./schedule-lessons.component.scss'],
})
export class ScheduleLessonsComponent {
    @Output() public dropEnd: EventEmitter<CdkDragDrop<LessonInterface[], any>> = new EventEmitter();
    @Output() public dragStart: EventEmitter<CdkDragStart> = new EventEmitter();
    @Output() public dragEnd: EventEmitter<CdkDragEnd> = new EventEmitter();
    @Output() public addToClipBoard: EventEmitter<LessonInterface> = new EventEmitter();
    @Output() public onLessonClick: EventEmitter<LessonInterface> = new EventEmitter();
    @Output() public onAddLesson: EventEmitter<void> = new EventEmitter();
    @Output() public onPasteLesson: EventEmitter<void> = new EventEmitter();
    @Input() public lessons: LessonInterface[];
    @Input() public isSomeDragging: boolean;
    @Input() public clipboardData: LessonInterface;
    @Output() public deleteLesson: EventEmitter<number> = new EventEmitter<number>();
    @Output() public moveLesson: EventEmitter<number> = new EventEmitter<number>();
    @ViewChild(CdkDropList, {static: false}) dropList: CdkDropList;
    public lessonTypesMap: Map<number, LessonFormatInterface> = lessonFormatMap();
    public isPlaced = false;
    private index = 0;

    constructor(private formatService: FormatService) {}

    public isLessonNotSpecified(): (data: CdkDrag) => boolean {
        return (data: CdkDrag) => {
            if (data.data) {
                const lessonsWeeks = this.lessons.map(lesson => lesson.weeks.split('').map(week => !!+week));
                const draggedWeeks = data.data.weeks.split('').map(week => !!+week);
                return !lessonsWeeks.length || lessonsWeeks
                    .every((weeks, lessonIndex) => this.isDifferentSchedule(weeks, draggedWeeks)
                        || this.formatService.isDifferentSubgroups(this.lessons[lessonIndex], data.data)
                        || this.formatService.isSameName(this.lessons[lessonIndex], data.data));
            } else return false;
        };
    }

    drop(event: CdkDragDrop<LessonInterface[], any>) {
        if (event.previousContainer === event.container) moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            this.moveLesson.emit(event.item.data.id);
        }
        this.dropEnd.emit(event);
        this.isPlaced = false;
    }

    getWeeks(lesson: LessonInterface): string {
        return lesson.weeks.split('')
                     .map(bite => !!+bite)
                     .reduce((weeksSequence, isLesson, index, weeksBool) => {
                         switch (true) {
                             case isLesson && !weeksSequence:
                                 return weeksSequence = (index + 1).toString();
                             case isLesson && !weeksBool[index - 1]:
                                 return weeksSequence + ', ' + (index + 1);
                             case isLesson && index === weeksBool.length - 1:
                                 return weeksSequence + '-' + (index + 1);
                             case !isLesson && weeksBool[index - 1] && weeksBool[index - 2]:
                                 return weeksSequence + '-' + index;
                             default:
                                 return weeksSequence;
                         }
                     }, '');
    }

    private isDifferentSchedule(weeks1: boolean[], weeks2: boolean[]): boolean {
        return weeks1.every((item, i) => !item || item !== weeks2[i]);
    }
}
