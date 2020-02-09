import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GroupService } from '@app/service/group/group.service';
import { LessonService } from '@app/service/lesson/lesson.service';
import { ScheduleService } from '@app/service/schedule/schedule.service';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { SelectInputModule } from '@app/shared/select-input/select-input.module';
import { LessonEditorComponent } from 'src/app/popup/modal/lesson-editor/lesson-editor.component';

import { ModalRoutingModule } from 'src/app/popup/modal/modal-routing.module';

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
