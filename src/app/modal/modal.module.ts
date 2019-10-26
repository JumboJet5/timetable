import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatService } from 'src/app/service/format/format.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { LessonEditorComponent } from './lesson-editor/lesson-editor.component';

import { ModalRoutingModule } from './modal-routing.module';

@NgModule({
  declarations: [LessonEditorComponent],
  imports: [
    CommonModule,
    ModalRoutingModule,
  ],
  providers: [
    LessonService,
    FormatService,
  ],
})
export class ModalModule {
}
