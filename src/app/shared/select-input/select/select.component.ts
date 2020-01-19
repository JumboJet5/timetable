import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { accordionTransitionAnimation } from '../../../../core/animations/accordion.animation';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    accordionTransitionAnimation,
  ],
})
export class SelectComponent implements OnDestroy {
  @Input() public isDark = false;
  @Input() public isMulti = false;
  @Input() public isInvalid: boolean;
  @Input() public isDisabled = false;
  @Input() public isReadonly = false;
  @Output() public closed: EventEmitter<void> = new EventEmitter();
  @Output() public changes: EventEmitter<any> = new EventEmitter();
  public selectState: BehaviorSubject<AbstractControl> = new BehaviorSubject(this.abstractControl);
  private unsubscribe: Subject<void> = new Subject<void>();

  private _abstractControl: AbstractControl;

  public get abstractControl(): AbstractControl {
    return this._abstractControl;
  }

  @Input()
  public set abstractControl(control: AbstractControl) {
    this._abstractControl = control;
    this.selectState.next(control);
    if (control) this.abstractControl.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .pipe(distinctUntilChanged((prev, curr) => prev === curr))
      .subscribe(value => this.changes.emit(value));
  }

  private _isOpened = false;

  public get isOpened(): boolean {
    return this._isOpened;
  }

  @Input()
  public set isOpened(value: boolean) {
    this._isOpened = value && !this.isDisabled && !this.isReadonly;
    if (!this.isOpened) this.closed.emit();
  }

  public toggle(): boolean {
    this.isOpened = !this.isOpened;
    return false; // important !!! stopping propagation click event
  }

  @HostListener('beforeunload')
  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
