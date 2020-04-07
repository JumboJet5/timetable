import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-specialty-interface-type-select',
  templateUrl: './specialty-interface-type-select.component.html',
  styleUrls: ['./specialty-interface-type-select.component.scss'],
})
export class SpecialtyInterfaceTypeSelectComponent {
  @Input() public selectControl: AbstractControl;

  public typesMap: Map<number, string> = new Map<number, string>([
    [0, 'З логотипом'],
    [1, 'Без логотипу'],
    [2, 'Інший'],
  ]);
}
