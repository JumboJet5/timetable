import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePickerModule } from '@app/shared/date-picker/date-picker.module';
import { LoadImageModule } from '@app/shared/load-image/load-image.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { SelectInputModule } from '@app/shared/select-input/select-input.module';
import { LessonEditorComponent } from 'src/app/popup/modal/lesson-editor/lesson-editor.component';

import { ModalRoutingModule } from 'src/app/popup/modal/modal-routing.module';
import { CreateGroupsemesterComponent } from './create-groupsemester/create-groupsemester.component';
import { CreateLessontimeComponent } from './create-lessontime/create-lessontime.component';
import { CreateSemesterComponent } from './create-semester/create-semester.component';
import { CreateSpecialtyComponent } from './create-specialty/create-specialty.component';
import { CreateFacultyComponent } from './create-faculty/create-faculty.component';
import { UpdateLessontimeComponent } from './update-lessontime/update-lessontime.component';
import { CreateHousingComponent } from 'src/app/popup/modal/create-housing/create-housing.component';
import { CreateUniversityComponent } from './create-university/create-university.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';

@NgModule({
  declarations: [
    LessonEditorComponent,
    CreateGroupsemesterComponent,
    CreateSemesterComponent,
    CreateLessontimeComponent,
    CreateSpecialtyComponent,
    CreateFacultyComponent,
    UpdateLessontimeComponent,
    CreateHousingComponent,
    CreateUniversityComponent,
    CreateGroupComponent,
    CreateCourseComponent,
    ModalWrapperComponent,
  ],
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
    LoadImageModule,
  ],
})
export class ModalModule {}
