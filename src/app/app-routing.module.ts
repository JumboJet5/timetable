import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeekScheduleComponent } from 'src/app/week-schedule/week-schedule.component';

const routes: Routes = [
  {path: '', component: WeekScheduleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
