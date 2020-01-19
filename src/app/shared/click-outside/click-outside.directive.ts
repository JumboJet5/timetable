import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output() public clickOutside: EventEmitter<void> = new EventEmitter();
  private _clickedInside = false;

  @HostListener('click')
  public onClick() {
    this._clickedInside = true;
  }

  @HostListener('window:click')
  public onClickOutside() {
    !this._clickedInside ? this.clickOutside.emit() : this._clickedInside = false;
  }
}
