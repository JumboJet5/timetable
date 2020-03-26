import { Component, Host } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
  selector: 'app-select-result',
  templateUrl: './select-result.component.html',
  styleUrls: ['./select-result.component.scss', '../../../../../static/schedule-widget/assets/stylesheet/default-form.scss'],
})
export class SelectResultComponent {
  constructor(@Host() public parent: SelectComponent) {}
}
