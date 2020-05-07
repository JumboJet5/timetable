import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { controlTypesMap } from '@const/collections';

@Component({
  selector: 'app-control-type-selector',
  templateUrl: './control-type-selector.component.html',
  styleUrls: ['./control-type-selector.component.scss'],
})
export class ControlTypeSelectorComponent {
  @Input() public selectControl: AbstractControl;
  public controlTypesMap = controlTypesMap();
}
