import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePickerModule } from '@app/shared/date-picker/date-picker.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { SelectInputModule } from '@app/shared/select-input/select-input.module';
import { LessonEditorComponent } from 'src/app/popup/modal/lesson-editor/lesson-editor.component';

import { ModalRoutingModule } from 'src/app/popup/modal/modal-routing.module';
import { CreateGroupsemesterComponent } from './create-groupsemester/create-groupsemester.component';
import { CreateSemesterComponent } from './create-semester/create-semester.component';
import { CreateLessontimeComponent } from './create-lessontime/create-lessontime.component';

@NgModule({
  declarations: [LessonEditorComponent, CreateGroupsemesterComponent, CreateSemesterComponent, CreateLessontimeComponent],
  imports: [
    CommonModule,
    ModalRoutingModule,
    ReactiveFormsModule,
    MenuSelectModule,
    SelectInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    DatePickerModule,
    MatIconModule,
  ],
})
export class ModalModule {}
