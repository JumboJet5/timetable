import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightingDirective } from './highlighting.directive';



@NgModule({
  declarations: [HighlightingDirective],
  exports: [
    HighlightingDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class HighlightingModule { }
