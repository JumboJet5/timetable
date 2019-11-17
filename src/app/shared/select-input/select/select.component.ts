import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OptionItemComponent } from '../option-item/option-item.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnDestroy, OnInit, OnChanges {
  @Input() public width = 100;
  @Input() public abstractControl: AbstractControl;
  @Input() public isMulti = false;
  @Input() public isInvalid: boolean;
  @Input() public isDisabled = false;
  @Input() public isReadonly = false;
  @Output() public closed: EventEmitter<void> = new EventEmitter();
  @Output() public changes: EventEmitter<any> = new EventEmitter();
  public controlArray: FormArray = new FormArray([]);
  private optionMap: Map<symbol, OptionItemComponent> = new Map<symbol, OptionItemComponent>();
  private controlMap: Map<symbol, FormControl> = new Map<symbol, FormControl>();
  private idControlMap: Map<AbstractControl, symbol> = new Map<AbstractControl, symbol>();
  private unsubscribe: Subject<void> = new Subject<void>();
  private selectState: BehaviorSubject<SelectComponent> = new BehaviorSubject(this);
  private _notSelected: symbol = Symbol('not selected');

  private _isOpened: boolean;

  public get isOpened(): boolean {
    return this._isOpened;
  }

  @Input()
  public set isOpened(value: boolean) {
    this._isOpened = value && !this.isDisabled && !this.isReadonly && !!this.controlArray.controls.length;
    if (!this.isOpened) this.closed.emit();
    this.selectState.next(this);
  }

  private getControlIndex(optionId: symbol): number {
    const currentControl = this.getControlById(optionId);
    return this.controlArray.controls.findIndex(item => item === currentControl);
  }

  private getItemValue(id: symbol): any {
    return this.optionMap.has(id) ? this.optionMap.get(id).value : undefined;
  }

  private getSelectedValue() {
    return this.controlArray.controls
      .map(item => item.value ? this.getItemValue(this.idControlMap.get(item)) : this._notSelected)
      .filter(item => item !== this._notSelected);
  }

  private emitFilters(): void {
    const value = this.isMulti ? this.getSelectedValue() : this.getSelectedValue()[0];
    this.updateAbstractControl(value);
    setTimeout(() => this.changes.emit(value));
  }

  private updateAbstractControl(value: any) {
    if (this.abstractControl) {
      this.abstractControl.patchValue(value);
      this.abstractControl.markAsDirty({onlySelf: false});
    }
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.selectState.next(this);
  }

  public toggle(): boolean {
    this.isOpened = !this.isOpened;
    return false; // important !!! stopping propagation click event
  }

  public getStateObserver(): Observable<SelectComponent> {
    return this.selectState.asObservable();
  }

  public registerItemInParent(option: OptionItemComponent): symbol {
    const id = Symbol('id');
    const control = new FormControl(option.checked);
    control.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.emitFilters());

    this.optionMap.set(id, option);
    this.controlMap.set(id, control);
    this.idControlMap.set(control, id);
    this.controlArray.push(control);

    return id;
  }

  public unregisterOption(id: symbol): void {
    this.optionMap.delete(id);
    this.idControlMap.delete(this.getControlById(id));
    this.controlArray.removeAt(this.getControlIndex(id));
    this.controlMap.delete(id);
  }

  public getControlById(id: symbol): FormControl {
    return this.controlMap.get(id);
  }

  public checkOptionAsRadio(optionId: symbol): void {
    if (this.optionMap.has(optionId)) {
      const base = new Array(this.controlArray.controls.length).fill(false);
      base[this.getControlIndex(optionId)] = true;
      this.controlArray.patchValue(base);
      this.isOpened = false;
    }
  }

  @HostListener('beforeunload')
  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
