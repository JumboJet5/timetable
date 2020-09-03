import { Component, Host, Input, Output } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
  selector: 'app-select-result',
  templateUrl: './select-result.component.html',
  styleUrls: ['./select-result.component.scss', '../../../../../static/schedule-widget/assets/stylesheet/default-form.scss'],
})
export class SelectResultComponent {
  @Input() public toggleFunc = () => {
    if (!this.parent.isFocusEventsTriggerOpenSelect) this.parent.isOpened = !this.parent.isOpened;
    this.parent.isFocusEventsTriggerOpenSelect = false;
  }

  constructor(@Host() public parent: SelectComponent) {}

  public toggle() {
    if (this.toggleFunc) this.toggleFunc();
  }
}
