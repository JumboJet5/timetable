import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { DatePickerModule } from '@app/shared/date-picker/date-picker.module';
import { LoadImageModule } from '@app/shared/load-image/load-image.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { SmartLessontimeEntityComponent } from '@app/shared/smart-entities/smart-lessontime-entity/smart-lessontime-entity.component';
import { SmartSemesterEntityComponent } from '@app/shared/smart-entities/smart-semester-entity/smart-semester-entity.component';
import { SmartThemeEntityComponent } from '@app/shared/smart-entities/smart-theme-entity/smart-theme-entity.component';
import { SmartCourseEntityComponent } from './smart-course-entity/smart-course-entity.component';
import { SmartDetailsComponent } from './smart-details/smart-details.component';
import { SmartGroupEntityComponent } from './smart-group-entity/smart-group-entity.component';
import { SmartSpecialtyEntityComponent } from './smart-specialty-entity/smart-specialty-entity.component';
import { SmartFacultyEntityComponent } from './smart-faculty-entity/smart-faculty-entity.component';
import { SmartHousingEntityComponent } from './smart-housing-entity/smart-housing-entity.component';
import { SmartRoomEntityComponent } from './smart-room-entity/smart-room-entity.component';
import { SmartTeacherEntityComponent } from './smart-teacher-entity/smart-teacher-entity.component';


@NgModule({
  declarations: [
    SmartSemesterEntityComponent,
    SmartThemeEntityComponent,
    SmartLessontimeEntityComponent,
    SmartGroupEntityComponent,
    SmartDetailsComponent,
    SmartCourseEntityComponent,
    SmartSpecialtyEntityComponent,
    SmartFacultyEntityComponent,
    SmartHousingEntityComponent,
    SmartRoomEntityComponent,
    SmartTeacherEntityComponent,
  ],
  exports: [
    SmartDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    DatePickerModule,
    MenuSelectModule,
    MatCheckboxModule,
    LoadImageModule,
  ],
  providers: [SmartDetailsService],
})
export class SmartEntitiesModule {}
