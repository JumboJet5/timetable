import { Component, Host, OnInit } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
  selector: 'app-select-result',
  templateUrl: './select-result.component.html',
  styleUrls: ['./select-result.component.scss', '../../../../../assets/stylesheet/default-form.scss'],
})
export class SelectResultComponent implements OnInit {
  public isOpened: boolean;
  public isReadonly: boolean;
  public isDisabled: boolean;
  public isInvalid: boolean;

  constructor(@Host() private parent: SelectComponent) {
  }

  private updateLabel(parent: SelectComponent) {
    this.isOpened = parent.isOpened;
    this.isInvalid = parent.isInvalid;
    this.isDisabled = parent.isDisabled;
    this.isReadonly = parent.isReadonly;
  }

  public ngOnInit(): void {
    this.parent.getStateObserver()
      .subscribe((parent) => this.updateLabel(parent));
  }
}
