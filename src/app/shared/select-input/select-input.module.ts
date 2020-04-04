import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClickOutsideModule } from '../click-outside/click-outside.module';
import { OptionItemComponent } from './option-item/option-item.component';
import { SelectResultComponent } from './select/select-result/select-result.component';
import { SelectComponent } from './select/select.component';


@NgModule({
  declarations: [
    SelectComponent,
    OptionItemComponent,
    SelectResultComponent,
  ],
  exports: [
    SelectComponent,
    OptionItemComponent,
    SelectResultComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ClickOutsideModule,
    MatButtonModule,
  ],
})
export class SelectInputModule {
}
