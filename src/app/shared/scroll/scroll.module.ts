import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollDirective } from 'src/app/shared/scroll/scroll.directive';

@NgModule({
  declarations: [ScrollDirective],
  exports: [ScrollDirective],
  imports: [
    CommonModule
  ]
})
export class ScrollModule { }
