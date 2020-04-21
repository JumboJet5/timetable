import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { degreeMap } from '@const/collections';

@Component({
  selector: 'app-degree-selector',
  templateUrl: './degree-selector.component.html',
  styleUrls: ['./degree-selector.component.scss'],
})
export class DegreeSelectorComponent {
  @Input() public selectControl: AbstractControl;
  public degreeMap = degreeMap();
}
