import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeekScheduleComponent } from 'src/app/week-schedule/week-schedule.component';

const routes: Routes = [
  {path: ':groupSlug/:groupId', component: WeekScheduleComponent},
  {
    path: 'modal', outlet: 'modal', loadChildren: () => import('./modal/modal.module')
      .then(module => module.ModalModule),
  },
  {path: '', pathMatch: 'full', redirectTo: 'groupSlug/groupId'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
