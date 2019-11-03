import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatService } from 'src/app/service/format/format.service';
import { MenuSelectComponent } from 'src/app/shared/menu-select/menu-select.component';
import { ScrollModule } from 'src/app/shared/scroll/scroll.module';
import { SelectInputModule } from 'src/app/shared/select-input/select-input.module';

@NgModule({
  declarations: [MenuSelectComponent],
  exports: [MenuSelectComponent],
  imports: [
    CommonModule,
    ScrollModule,
    ReactiveFormsModule,
    SelectInputModule,
  ],
  providers: [FormatService],
})
export class MenuSelectModule {
}
