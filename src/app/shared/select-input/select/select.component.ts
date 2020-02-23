import {
  Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output, QueryList, ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { accordionTransitionAnimation } from '@animations/accordion.animation';
import { OptionItemComponent } from '@app/shared/select-input/option-item/option-item.component';
import { SelectService } from '@app/shared/select-input/service/select.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [SelectService],
  animations: [accordionTransitionAnimation],
})
export class SelectComponent implements OnDestroy {
  @Input() public isDark = false;
  @Input() public isMulti = false;
  @Input() public isInvalid: boolean;
  @Input() public isDisabled = false;
  @Input() public isReadonly = false;
  @Output() public closed: EventEmitter<void> = new EventEmitter();
  @Output() public opened: EventEmitter<void> = new EventEmitter();
  @Output() public changes: EventEmitter<any> = new EventEmitter();
  @HostBinding('tabindex') public tabindex = 0;
  @ViewChild('optionsContent') public optionsContent: ElementRef<HTMLDivElement>;
  public selectState: BehaviorSubject<AbstractControl> = new BehaviorSubject(this.abstractControl);
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _selectService: SelectService,
              private _element: ElementRef) {
    this._selectService.select = this;
  }

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
    const prevValue = this.isOpened;
    this._isOpened = value && !this.isDisabled && !this.isReadonly;
    if (prevValue === this.isOpened) return;

    if (!this.isOpened) {
      this.closed.emit();
      this._element.nativeElement.blur();
    } else {
      this.opened.emit();
      this._element.nativeElement.focus();
    }
  }

  private _options: QueryList<OptionItemComponent>;

  public get options(): QueryList<OptionItemComponent> {
    return this._options;
  }

  @ContentChildren(OptionItemComponent, {descendants: true})
  public set options(value: QueryList<OptionItemComponent>) {
    this._options = value;
    value.changes
      .pipe(takeUntil(this.unsubscribe))
      .pipe(filter(data => !this._selectService.hasActive() && !!data.first))
      .subscribe(() => this.initActive());

    this.initActive();
  }

  public initActive(): void {
    this._selectService.setActive(this.options.first);
  }

  @HostListener('keydown.enter')
  public onEnter() {
    this._selectService.selectActive();
  }

  @HostListener('keydown.arrowDown')
  public onArrowDown() {
    this._selectService.setNextOptionActive('next');
  }

  @HostListener('keydown.arrowUp')
  public onArrowUp() {
    this._selectService.setNextOptionActive('prev');
  }

  @HostListener('focus')
  public onFocus() {
    this.isOpened = true;
  }

  @HostListener('keydown.tab')
  public onBlur() {
    this.isOpened = false;
  }

  @HostListener('beforeunload')
  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
