import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { dayMap, weekDays } from '@const/collections';

@Component({
  selector: 'app-day-select',
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.scss']
})
export class DaySelectComponent {
  @Input() public selectControl: AbstractControl;
  public dayMap: Map<number, string> = dayMap();
  public weekDays: string[] = weekDays();
}
