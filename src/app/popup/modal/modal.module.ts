import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatProgressSpinnerModule,
  ],
})
export class ModalModule {}
