import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WeekScheduleModule } from 'src/app/dashboard/week-schedule/week-schedule.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    WeekScheduleModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class DashboardModule {}
