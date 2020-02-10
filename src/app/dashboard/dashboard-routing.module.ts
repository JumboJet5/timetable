import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekScheduleComponent } from 'src/app/dashboard/week-schedule/week-schedule.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';


const routes: Routes = [
  {path: 'lessons-schedule/:groupSlug', component: WeekScheduleComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: '/dashboard/lessons-schedule/groupSlug'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
