import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScheduleLessonsComponent } from '@app/dashboard/week-schedule/schedule-lessons/schedule-lessons.component';
import { WeekScheduleComponent } from '@app/dashboard/week-schedule/week-schedule.component';
import { LessonService } from '@app/service/lesson/lesson.service';
import { DefaultAvatarModule } from '@app/shared/default-avatar/default-avatar.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';

@NgModule({
  declarations: [WeekScheduleComponent, ScheduleLessonsComponent],
  exports: [WeekScheduleComponent],
  providers: [
    LessonService,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MenuSelectModule,
    MatProgressSpinnerModule,
    DefaultAvatarModule,
  ],
})
export class WeekScheduleModule {
}
