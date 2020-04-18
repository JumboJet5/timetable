import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-lesson-format-select',
  templateUrl: './lesson-format-select.component.html',
  styleUrls: ['./lesson-format-select.component.scss'],
})
export class LessonFormatSelectComponent {
  @Input() public selectControl: AbstractControl;
  public formatMap: Map<string, string> = new Map<string, string>([
    ['online', 'онлайн'],
    ['offline', 'офлайн'],
    ['unknown', 'не визначено'],
  ]);
}
