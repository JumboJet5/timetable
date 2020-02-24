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

  public unsetActive(): void {
    this._activeOption = undefined;
  }

  public selectActive(): void {
    if (this._activeOption) this._activeOption.onClick();
  }

  public setNextOptionActive(direction: 'next' | 'prev', circular: boolean = true): void {
    if (!this.select) return;

    const index = this.select.options.toArray().indexOf(this._activeOption);
    if (index === -1) return;

    let nextIndex = direction === 'next' ? index + 1 : index - 1;
    if (circular) nextIndex = (nextIndex + this.select.options.length) % this.select.options.length;
    else if (nextIndex >= this.select.options.length) nextIndex = this.select.options.length - 1;
    else if (nextIndex < 0) nextIndex = 0;

    this.setActive(this.select.options.toArray()[nextIndex]);
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
