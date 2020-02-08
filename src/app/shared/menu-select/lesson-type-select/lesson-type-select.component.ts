import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { lessonTypes, lessonTypesMap } from '@const/collections';
import { LessonFormatInterface } from '@interfaces';

@Component({
  selector: 'app-lesson-type-select',
  templateUrl: './lesson-type-select.component.html',
  styleUrls: ['./lesson-type-select.component.scss']
})
export class LessonTypeSelectComponent {
  @Input() public selectControl: AbstractControl;
  public lessonsMap: Map<number, LessonFormatInterface> = lessonTypesMap();
  public lessonFormats = lessonTypes();
}
