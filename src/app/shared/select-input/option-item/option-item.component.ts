import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SelectService } from '@app/shared/select-input/service/select.service';
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

  constructor(public selectService: SelectService,
              public element: ElementRef<HTMLElement>) {}

  private _active = false;

  public get active(): boolean {
    return this._active;
  }

  public set active(value: boolean) {
    setTimeout(() => this._active = value);
  }

  public ngOnInit(): void {
    this.checked = this._isValueChecked(this.selectService.select.abstractControl.value);
    this.selectService.select.selectState
      .subscribe((control) => this._updateItem(control));
  }

  @HostListener('click')
  public onClick(): boolean {
    if (this.selectService.select && this.selectService.select.isMulti) this._onMultiItemClick();
    else this._onRadioItemClick();
    this.selectService.select.abstractControl.markAsTouched();

    return false;
  }

  @HostListener('mouseover')
  public onHover() {
    this.selectService.setActive(this);
  }

  @HostListener('beforeunload')
  public ngOnDestroy(): void {
    if (this.active) this.selectService.unsetActive();
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _updateItem(control: AbstractControl) {
    if (control) control.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this.checked = this._isValueChecked(value));
  }

  private _isValueChecked(value: any[]) {
    return this.selectService.select && this.selectService.select.isMulti
      ? value instanceof Array && value.includes(this.value) : value === this.value;
  }

  private _onMultiItemClick() {
    if (this.selectService.select && this.selectService.select.abstractControl) {
      const controlValue = this.selectService.select.abstractControl.value || [];
      if (!this.checked) this.selectService.select.abstractControl.patchValue([...controlValue, this.value]);
      else this.selectService.select.abstractControl.patchValue(controlValue.filter(item => item !== this.value));
      this.selectService.select.abstractControl.markAsDirty();
    }
  }

  private _onRadioItemClick() {
    if (this.selectService.select && this.selectService.select.abstractControl) {
      this.selectService.select.abstractControl.patchValue(this.value);
      this.selectService.select.abstractControl.markAsDirty();
      this.selectService.select.isOpened = false;
    }
  }
}
