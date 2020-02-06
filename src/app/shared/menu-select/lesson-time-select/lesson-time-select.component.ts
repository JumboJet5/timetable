import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';

@Component({
  selector: 'app-lesson-time-select',
  templateUrl: './lesson-time-select.component.html',
  styleUrls: ['./lesson-time-select.component.scss']
})
export class LessonTimeSelectComponent {
  @Input() public selectControl: AbstractControl;
  @Input() public lessonTimes: ILessonTime[];
  @Input() public disabled = false;

  public getLessonTimeById(id: number): string {
    const lessonTime = this.lessonTimes.find(i => i.id === id);
    return lessonTime ? `${lessonTime.num} пара (${lessonTime.start} - ${lessonTime.end})` : '';
  }
}
