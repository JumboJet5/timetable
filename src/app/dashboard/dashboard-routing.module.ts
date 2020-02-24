import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: '', loadChildren: () => import('./home/home.module')
          .then(module => module.HomeModule),
      },
      {
        path: 'universities', loadChildren: () => import('./universities/universities.module')
          .then(module => module.UniversitiesModule),
      },
      {
        path: 'lessons-schedule', loadChildren: () => import('./week-schedule/week-schedule.module')
          .then(module => module.WeekScheduleModule),
      },
    ],
  },
  {path: '**', redirectTo: 'lessons-schedule/groupSlug'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
