import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeekScheduleComponent } from 'src/app/dashboard/week-schedule/week-schedule.component';


const routes: Routes = [
  {path: ':groupSlug', component: WeekScheduleComponent},
  {path: '**', redirectTo: 'groupSlug'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeekScheduleRoutingModule {}
