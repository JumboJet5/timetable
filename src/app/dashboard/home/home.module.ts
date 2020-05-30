import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightingModule } from '@app/shared/highlighting/highlighting.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HighlightingModule,
  ],
})
export class HomeModule {}
