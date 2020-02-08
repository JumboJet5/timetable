import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeekScheduleModule } from 'src/app/dashboard/week-schedule/week-schedule.module';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    WeekScheduleModule,
  ]
})
export class DashboardModule {}
