import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InViewportModule } from 'ng-in-viewport';
import { ScrollModule } from '../scroll/scroll.module';
import { SelectInputModule } from '../select-input/select-input.module';
import { CourseSelectComponent } from './course-select/course-select.component';
import { DaySelectComponent } from './day-select/day-select.component';
import { DegreeSelectorComponent } from './degree-selector/degree-selector.component';
import { FacultySelectComponent } from './faculty-select/faculty-select.component';
import { GroupSelectComponent } from './group-select/group-select.component';
import { HousingSelectComponent } from './housing-select/housing-select.component';
import { LessonFormatSelectComponent } from './lesson-format-select/lesson-format-select.component';
import { LessonSubgroupSelectComponent } from './lesson-subgroup-select/lesson-subgroup-select.component';
import { LessonTimeSelectComponent } from './lesson-time-select/lesson-time-select.component';
import { LessonTypeSelectComponent } from './lesson-type-select/lesson-type-select.component';
import { LessonWeeksSelectorComponent } from './lesson-weeks-selector/lesson-weeks-selector.component';
import { RoomSelectComponent } from './room-select/room-select.component';
import { SemesterSelectComponent } from './semester-select/semester-select.component';
import { SpecialtyInterfaceTypeSelectComponent } from './specialty-interface-type-select/specialty-interface-type-select.component';
import { SpecialtySelectComponent } from './specialty-select/specialty-select.component';
import { TeacherAutocompleteComponent } from './teacher-autocomplete/teacher-autocomplete.component';
import { TeacherSelectComponent } from './teacher-select/teacher-select.component';
import { ThemeSelectComponent } from './theme-select/theme-select.component';
import { UniversitySelectComponent } from './university-select/university-select.component';
import { YearSelectComponent } from './year-select/year-select.component';


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
  TeacherAutocompleteComponent,
  LessonWeeksSelectorComponent,
  UniversitySelectComponent,
  FacultySelectComponent,
  SpecialtySelectComponent,
  CourseSelectComponent,
  SemesterSelectComponent,
  YearSelectComponent,
  LessonFormatSelectComponent,
  DegreeSelectorComponent,
  SpecialtyInterfaceTypeSelectComponent,
];

@NgModule({
  declarations: [...exportComponents],
  exports: [...exportComponents],
  imports: [
    CommonModule,
    ScrollModule,
    ReactiveFormsModule,
    SelectInputModule,
    InViewportModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
})
export class MenuSelectModule {
}
