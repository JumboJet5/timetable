import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionHeaderComponent } from './accordion-header/accordion-header.component';



@NgModule({
  declarations: [AccordionComponent, AccordionHeaderComponent],
  exports: [
    AccordionComponent,
    AccordionHeaderComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class AccordionModule { }
