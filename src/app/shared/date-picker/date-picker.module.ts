import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { ClickOutsideModule } from '@app/shared/click-outside/click-outside.module';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
  declarations: [DatePickerComponent],
  exports: [
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    ClickOutsideModule,
    MatIconModule,
  ],
  providers: [DateFormatService],
})
export class DatePickerModule {
}
