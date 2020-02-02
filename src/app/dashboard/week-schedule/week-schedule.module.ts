import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ScheduleLessonsComponent } from 'src/app/dashboard/week-schedule/schedule-lessons/schedule-lessons.component';
import { WeekScheduleComponent } from 'src/app/dashboard/week-schedule/week-schedule.component';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { MenuSelectModule } from 'src/app/shared/menu-select/menu-select.module';
import { DefaultAvatarModule } from '../../shared/default-avatar/default-avatar.module';

@NgModule({
  declarations: [WeekScheduleComponent, ScheduleLessonsComponent],
  exports: [WeekScheduleComponent],
  providers: [
    ScheduleService,
    LessonService,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MenuSelectModule,
    MatProgressSpinnerModule,
    DefaultAvatarModule,
  ],
})
export class WeekScheduleModule {
}
