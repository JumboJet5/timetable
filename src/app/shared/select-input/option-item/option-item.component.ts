import { Component, Host, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SelectComponent } from '../select/select.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-option-item',
    templateUrl: './option-item.component.html',
    styleUrls: ['./option-item.component.scss'],
})
export class OptionItemComponent implements OnInit, OnDestroy {
  @Input() public value: any;
  @Input() public checked = false;
  @Input() public disabled = false;
  private _unsubscribe: Subject<void> = new Subject<void>();

  constructor(@Host() public parent: SelectComponent) {
  }

  public ngOnInit(): void {
    this.parent.selectState
      .subscribe((control) => this._updateItem(control));
  }

  @HostListener('click')
  public onClick(): boolean {
    if (this.parent && this.parent.isMulti) this._onMultiItemClick();
    else this._onRadioItemClick();

    return false;
  }

  @HostListener('beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _updateItem(control: AbstractControl) {
    if (control) control.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this.checked = this._isValueChecked(value));
  }

  private _isValueChecked(value: any[]) {
    return this.parent && this.parent.isMulti ? value instanceof Array && value.includes(this.value) : value === this.value;
  }

  private _onMultiItemClick() {
    if (this.parent && this.parent.abstractControl) {
      const controlValue = this.parent.abstractControl.value || [];
      if (!this.checked) this.parent.abstractControl.patchValue([...controlValue, this.value]);
      else this.parent.abstractControl.patchValue(controlValue.filter(item => item !== this.value));
      this.parent.abstractControl.markAsDirty();
    }
  }

  private _onRadioItemClick() {
    if (this.parent && this.parent.abstractControl) {
      this.parent.abstractControl.patchValue(this.value);
      this.parent.isOpened = false;
    }
  }
}
