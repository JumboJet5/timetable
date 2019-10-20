import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
} from '@angular/material';
import { FormatService } from 'src/app/service/format/format.service';
import { MenuSelectComponent } from 'src/app/shared/menu-select/menu-select.component';
import { ScrollModule } from 'src/app/shared/scroll/scroll.module';

@NgModule({
  declarations: [MenuSelectComponent],
  exports: [MenuSelectComponent],
  imports: [
    CommonModule,
    ScrollModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatChipsModule,
  ],
  providers: [FormatService],
})
export class MenuSelectModule {
}
