import { Component, EventEmitter, Host, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss'],
})
export class OptionItemComponent implements OnInit, OnDestroy {
  @Input() public value: any;
  @Input() public checked = false;
  public checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isMulti = false;
  private _itemId: symbol;
  private _formControl: FormControl;
  private _unsubscribe: Subject<void> = new Subject<void>();

  constructor(@Host() private parent: SelectComponent) {
  }

  private updateItem(parent: SelectComponent) {
    this.isMulti = parent.isMulti;
  }

  public ngOnInit(): void {
    this._itemId = this.parent.registerItemInParent(this);
    this._formControl = this.parent.getControlById(this._itemId);
    this._formControl.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(checked => this.checked = checked);

    this.parent.getStateObserver()
      .subscribe((parent) => this.updateItem(parent));
  }

  @HostListener('click')
  public onClick(): boolean {
    if (this.isMulti) {
      this._formControl.patchValue(!this.checked);
    } else if (!this.checked) {
      this.parent.checkOptionAsRadio(this._itemId);
    }
    return false;
  }

  @HostListener('beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
    this.parent.unregisterOption(this._itemId);
  }
}
