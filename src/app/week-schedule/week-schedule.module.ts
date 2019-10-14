import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { WeekScheduleComponent } from './week-schedule.component';
import { ScheduleLessonComponent } from './schedule-lesson/schedule-lesson.component';

@NgModule({
  declarations: [WeekScheduleComponent, ScheduleLessonComponent],
  exports: [WeekScheduleComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class WeekScheduleModule {
}
