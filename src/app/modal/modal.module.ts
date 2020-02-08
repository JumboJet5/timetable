import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GroupService } from 'src/app/service/group/group.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { MenuSelectModule } from 'src/app/shared/menu-select/menu-select.module';
import { SelectInputModule } from 'src/app/shared/select-input/select-input.module';
import { LessonEditorComponent } from './lesson-editor/lesson-editor.component';

import { ModalRoutingModule } from './modal-routing.module';

@NgModule({
  declarations: [LessonEditorComponent],
  imports: [
    CommonModule,
    ModalRoutingModule,
    ReactiveFormsModule,
    MenuSelectModule,
    SelectInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [
    LessonService,
    ScheduleService,
    GroupService,
  ],
})
export class ModalModule {
}
