import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightingDirective } from '@app/shared/highlighting/highlighting.directive';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent, HighlightingDirective],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
