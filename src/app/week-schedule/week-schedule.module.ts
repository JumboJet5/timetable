import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FormatService } from 'src/app/service/format/format.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { MenuSelectModule } from 'src/app/shared/menu-select/menu-select.module';
import { WeekScheduleComponent } from './week-schedule.component';
import { ScheduleLessonsComponent } from './schedule-lessons/schedule-lessons.component';

@NgModule({
  declarations: [WeekScheduleComponent, ScheduleLessonsComponent],
  exports: [WeekScheduleComponent],
  providers: [
    ScheduleService,
    FormatService,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MenuSelectModule,
  ],
})
export class WeekScheduleModule {
}
