import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlighting]',
})
export class HighlightingDirective {
  @Input() defaultColor = 'black';
  @Input() highlightColor = 'white';
  @Input() defaultBackground = 'inherit';
  @Input('appHighlighting') highlightBackground = 'lime';
  @HostBinding('style.color') color: string = this.defaultColor;
  @HostBinding('style.backgroundColor') background: string = this.defaultBackground;

  @HostListener('mouseenter') mouseover() {
    this.color = this.highlightColor;
    this.background = this.highlightBackground;
  }

  @HostListener('mouseleave') mouseleave() {
    this.background = this.defaultBackground;
    this.color = this.defaultColor;
  }
}
