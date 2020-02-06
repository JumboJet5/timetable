import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InViewportModule } from 'ng-in-viewport';
import { ScrollModule } from 'src/app/shared/scroll/scroll.module';
import { SelectInputModule } from 'src/app/shared/select-input/select-input.module';
import { GroupSelectComponent } from './group-select/group-select.component';
import { HousingSelectComponent } from './housing-select/housing-select.component';
import { LessonTypeSelectComponent } from './lesson-type-select/lesson-type-select.component';
import { RoomSelectComponent } from './room-select/room-select.component';
import { TeacherSelectComponent } from './teacher-select/teacher-select.component';
import { ThemeSelectComponent } from './theme-select/theme-select.component';
import { LessonSubgroupSelectComponent } from './lesson-subgroup-select/lesson-subgroup-select.component';
import { DaySelectComponent } from './day-select/day-select.component';
import { LessonTimeSelectComponent } from './lesson-time-select/lesson-time-select.component';


const exportComponents = [
  GroupSelectComponent,
  HousingSelectComponent,
  RoomSelectComponent,
  TeacherSelectComponent,
  ThemeSelectComponent,
  LessonTypeSelectComponent,
];

@NgModule({
  declarations: [...exportComponents, LessonSubgroupSelectComponent, DaySelectComponent, LessonTimeSelectComponent],
  exports: [...exportComponents, LessonSubgroupSelectComponent, DaySelectComponent, LessonTimeSelectComponent],
  imports: [
    CommonModule,
    ScrollModule,
    ReactiveFormsModule,
    SelectInputModule,
    InViewportModule,
  ],
})
export class MenuSelectModule {
}
