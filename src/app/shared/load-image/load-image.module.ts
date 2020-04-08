import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadImageComponent } from './load-image.component';



@NgModule({
  declarations: [LoadImageComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    LoadImageComponent,
  ],
})
export class LoadImageModule { }
