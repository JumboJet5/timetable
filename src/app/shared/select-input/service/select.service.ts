import { Injectable } from '@angular/core';
import { OptionItemComponent } from '@app/shared/select-input/option-item/option-item.component';
import { SelectComponent } from '@app/shared/select-input/select/select.component';

@Injectable()
export class SelectService {
  public select: SelectComponent;
  private _activeOption: OptionItemComponent;

  public hasActive(): boolean {
    return !!this._activeOption;
  }

  public setActive(option: OptionItemComponent, withScrolling: boolean = true): void {
    if (!option) return;

    if (this._activeOption) this._activeOption.active = false;
    this._activeOption = option;
    option.active = true;

    if (withScrolling) this._scrollToActive();
  }

  public selectActive(): void {
    if (this._activeOption) this._activeOption.onClick();
  }

  public setNextOptionActive(direction: 'next' | 'prev'): void {
    if (!this.select) return;

    const index = this.select.options.toArray().indexOf(this._activeOption);
    if (index === -1) return;

    if (direction === 'next') this.setActive(this.select.options.toArray()[(index + 1) % this.select.options.length]);
    else this.setActive(this.select.options.toArray()[(this.select.options.length + index - 1) % this.select.options.length]);
  }

  private _scrollToActive() {
    if (!!this.select && !!this.select.optionsContent) {
      const native = this._activeOption.element.nativeElement;
      const offsetParent = this.select.optionsContent.nativeElement;
      const isActiveBottomInViewport = native.offsetTop + native.offsetHeight < offsetParent.scrollTop + offsetParent.offsetHeight;
      const isActiveTopInViewport = native.offsetTop > offsetParent.scrollTop;
      if (!isActiveBottomInViewport) offsetParent.scroll({
        left: 0,
        top: native.offsetTop + native.offsetHeight - offsetParent.offsetHeight,
        behavior: 'auto',
      });
      if (!isActiveTopInViewport)
        offsetParent.scroll({left: 0, top: native.offsetTop, behavior: 'smooth'});
    }
  }
}
