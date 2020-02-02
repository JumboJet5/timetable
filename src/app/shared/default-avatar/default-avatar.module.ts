import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultAvatarComponent } from './default-avatar.component';



@NgModule({
  declarations: [DefaultAvatarComponent],
  exports: [
    DefaultAvatarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DefaultAvatarModule { }
