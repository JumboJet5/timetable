import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { periodTypesMap } from '@const/collections';

@Component({
  selector: 'app-period-types-select',
  templateUrl: './period-types-select.component.html',
  styleUrls: ['./period-types-select.component.scss'],
})
export class PeriodTypesSelectComponent {
  @Input() public selectControl: AbstractControl;
  public periodTypesMap = periodTypesMap();
}
