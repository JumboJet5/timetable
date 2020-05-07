import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { ClickOutsideModule } from '@app/shared/click-outside/click-outside.module';
import { DatePickerComponent } from '@app/shared/date-picker/date-picker/date-picker.component';
import { DateRangePickerComponent } from '@app/shared/date-picker/date-range-picker/date-range-picker.component';

@NgModule({
  declarations: [DateRangePickerComponent, DatePickerComponent],
  exports: [
    DateRangePickerComponent,
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
