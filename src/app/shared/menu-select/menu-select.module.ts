import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { InViewportModule } from 'ng-in-viewport';
import { ScrollModule } from 'src/app/shared/scroll/scroll.module';
import { SelectInputModule } from 'src/app/shared/select-input/select-input.module';
import { DaySelectComponent } from './day-select/day-select.component';
import { GroupSelectComponent } from './group-select/group-select.component';
import { HousingSelectComponent } from './housing-select/housing-select.component';
import { LessonSubgroupSelectComponent } from './lesson-subgroup-select/lesson-subgroup-select.component';
import { LessonTimeSelectComponent } from './lesson-time-select/lesson-time-select.component';
import { LessonTypeSelectComponent } from './lesson-type-select/lesson-type-select.component';
import { RoomSelectComponent } from './room-select/room-select.component';
import { TeacherAutocompleteComponent } from './teacher-autocomplete/teacher-autocomplete.component';
import { TeacherSelectComponent } from './teacher-select/teacher-select.component';
import { ThemeSelectComponent } from './theme-select/theme-select.component';
import { LessonWeeksSelectorComponent } from './lesson-weeks-selector/lesson-weeks-selector.component';


const exportComponents = [
  GroupSelectComponent,
  HousingSelectComponent,
  RoomSelectComponent,
  TeacherSelectComponent,
  ThemeSelectComponent,
  LessonTypeSelectComponent,
  LessonSubgroupSelectComponent,
  DaySelectComponent,
  LessonTimeSelectComponent,
  TeacherAutocompleteComponent
];

@NgModule({
  declarations: [...exportComponents, LessonWeeksSelectorComponent],
  exports: [...exportComponents, LessonWeeksSelectorComponent],
  imports: [
    CommonModule,
    ScrollModule,
    ReactiveFormsModule,
    SelectInputModule,
    InViewportModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class MenuSelectModule {
}
