import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ScheduleLessonsComponent } from 'src/app/dashboard/week-schedule/schedule-lessons/schedule-lessons.component';
import { WeekScheduleComponent } from 'src/app/dashboard/week-schedule/week-schedule.component';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { MenuSelectModule } from 'src/app/shared/menu-select/menu-select.module';

@NgModule({
    declarations: [WeekScheduleComponent, ScheduleLessonsComponent],
    exports: [WeekScheduleComponent],
    providers: [
        ScheduleService,
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
