import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IGroup } from '@interfaces';

@Component({
  selector: 'app-lesson-subgroup-select',
  templateUrl: './lesson-subgroup-select.component.html',
  styleUrls: ['./lesson-subgroup-select.component.scss']
})
export class LessonSubgroupSelectComponent {
  @Input() public selectControl: AbstractControl;
  public subgroups: number[] = [];

  @Input()
  public set group(value: IGroup) {
    if (value) this.subgroups = new Array(+value.subgroups).fill('').map((_, i) => i + 1);
  }
}
