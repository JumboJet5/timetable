import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';

@Component({
  selector: 'app-groupsemester-lesson-times',
  templateUrl: './groupsemester-lesson-times.component.html',
  styleUrls: ['./groupsemester-lesson-times.component.scss'],
})
export class GroupsemesterLessonTimesComponent implements OnInit {
  @Input() public lessonTimes: ILessonTime[];
  @Input() public groupsemester: IGroupsemester;
  @Input() public facultyId: number;
  @Output() public needUpdateLessonTimes: EventEmitter<void> = new EventEmitter<void>();
  @Output() public deleteLessonTime: EventEmitter<number> = new EventEmitter<number>();

  constructor(private lessonTimeService: LessonTimeService,
              private smartDetailsService: SmartDetailsService,
              private popupService: PopupService) { }

  ngOnInit(): void {
  }

  public isLessonTimeEnableForGroupsemester(lessonTimeId: number, groupsemester: IGroupsemester): boolean {
    return !!groupsemester && !!groupsemester.lessons_time && groupsemester.lessons_time.some(lessonTime => lessonTime.id === lessonTimeId);
  }

  public lessonTimeChanged(event: MatCheckboxChange, lessonTime: ILessonTime) {
    if (!this.groupsemester || !lessonTime) return;

    const {id, end, num, start} = lessonTime;
    if (event.checked && !this.groupsemester.lessons_time.find(item => item.id === id))
      this.groupsemester.lessons_time.push({id, end, num, start});
    if (!event.checked && !!this.groupsemester.lessons_time.find(item => item.id === id))
      this.groupsemester.lessons_time = this.groupsemester.lessons_time.filter(item => item.id !== id);

    this.needUpdateLessonTimes.emit();
  }

  public showLessonNumberChanged(event: MatCheckboxChange) {
    if (!this.groupsemester) return;

    this.groupsemester.show_lessons_number = event.checked;
    this.needUpdateLessonTimes.emit();
  }

  public createLessonTime() {
    this.popupService.openReactiveModal(['create-lessontime'], this.facultyId ? {faculty: this.facultyId} : {});
  }

  public openDetails(entity: ILessonTime) {
    this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.LESSONTIME};
  }
}
