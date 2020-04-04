import { Component, Host, HostListener } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
  selector: 'app-select-result',
  templateUrl: './select-result.component.html',
  styleUrls: ['./select-result.component.scss', '../../../../../core/stylesheet/default-form.scss'],
})
export class SelectResultComponent {
  constructor(@Host() public parent: SelectComponent) {}

  @HostListener('mousedown', ['$event'])
  public onArrow(event: MouseEvent) {
    if (!this.parent || !event.target || (event.target as HTMLElement).tabIndex > -1) return;

    const prevValue = this.parent.isOpened;
    setTimeout(() => this.parent.isOpened = !prevValue);
  }
}
