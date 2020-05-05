import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { teacherDegreesMap } from '@const/collections';

@Component({
  selector: 'app-teacher-degree-selector',
  templateUrl: './teacher-degree-selector.component.html',
  styleUrls: ['./teacher-degree-selector.component.scss'],
})
export class TeacherDegreeSelectorComponent {
  @Input() public selectControl: AbstractControl;
  public degreeMap = teacherDegreesMap();
}
