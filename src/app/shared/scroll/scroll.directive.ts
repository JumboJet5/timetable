import {Output, EventEmitter, ElementRef, HostListener, Directive} from '@angular/core';

@Directive({selector: '[appScroll]'})
export class ScrollDirective {
  oldBottom: number;
  oldTop: number;
  oldRight: number;
  oldLeft: number;
  inBottom = false;
  inTop = false;
  inRight = false;
  inLeft = false;
  @Output() public isScrollingToBottom: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public isScrollingToTop: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public isScrollingToRight: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public isScrollingToLeft: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public isDown: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public isUp: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public isRight: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public isLeft: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(elementRef: ElementRef) {
    const srcElement: Element = elementRef.nativeElement;
    this.oldBottom = srcElement.scrollTop + srcElement.scrollHeight;
    this.oldTop = srcElement.scrollTop;
    this.oldRight = srcElement.scrollLeft + srcElement.scrollWidth;
    this.oldLeft = srcElement.scrollLeft;

    this.inBottom = srcElement.scrollHeight - srcElement.scrollTop < 1.1 * srcElement.clientHeight;
    this.inTop = srcElement.scrollTop < 0.1 * srcElement.clientHeight;
    this.inRight = srcElement.scrollWidth - srcElement.scrollLeft < 1.1 * srcElement.clientWidth;
    this.inLeft = srcElement.scrollLeft < 0.1 * srcElement.clientWidth;
  }

  @HostListener('scroll', ['$event'])
  private onScroll($event: Event): void {
    const srcElement: Element = $event.target as Element;
    if (this.oldTop < srcElement.scrollTop) {
      this.isScrollingToBottom.emit(true);
      if (!this.inBottom && srcElement.scrollHeight - srcElement.scrollTop < 1.1 * srcElement.clientHeight) {
        this.inBottom = true;
        this.isDown.emit(true);
      } else {
        this.inBottom = srcElement.scrollHeight - srcElement.scrollTop < 1.1 * srcElement.clientHeight;
      }
    }
    if (this.oldTop > srcElement.scrollTop) {
      this.isScrollingToTop.emit(true);
      if (!this.inTop && srcElement.scrollTop < 0.1 * srcElement.clientHeight) {
        this.inTop = true;
        this.isUp.emit(true);
      } else {
        this.inTop = srcElement.scrollTop < 0.1 * srcElement.clientHeight;
      }
    }
    if (this.oldLeft < srcElement.scrollLeft) {
      this.isScrollingToRight.emit(true);
      if (!this.inRight && srcElement.scrollWidth - srcElement.scrollLeft < 1.1 * srcElement.clientWidth) {
        this.inRight = true;
        this.isRight.emit(true);
      } else {
        this.inRight = srcElement.scrollWidth - srcElement.scrollLeft < 1.1 * srcElement.clientWidth;
      }
    }
    if (this.oldLeft > srcElement.scrollLeft) {
      this.isScrollingToLeft.emit(true);
      if (!this.inLeft && srcElement.scrollLeft < 0.1 * srcElement.clientWidth) {
        this.inLeft = true;
        this.isLeft.emit(true);
      } else {
        this.inLeft = srcElement.scrollLeft < 0.1 * srcElement.clientWidth;
      }
    }
    this.oldBottom = srcElement.scrollTop + srcElement.scrollHeight;
    this.oldTop = srcElement.scrollTop;
    this.oldRight = srcElement.scrollLeft + srcElement.scrollWidth;
    this.oldLeft = srcElement.scrollLeft;
  }
}
