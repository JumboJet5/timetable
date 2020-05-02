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
        path: 'groups', loadChildren: () => import('./groups/groups.module')
          .then(module => module.GroupsModule),
      },
      {
        path: 'courses', loadChildren: () => import('./courses/courses.module')
          .then(module => module.CoursesModule),
      },
      {
        path: 'specialties', loadChildren: () => import('./specialties/specialties.module')
          .then(module => module.SpecialtiesModule),
      },
      {
        path: 'faculties', loadChildren: () => import('./faculties/faculties.module')
          .then(module => module.FacultiesModule),
      },
      {
        path: 'universities', loadChildren: () => import('./universities/universities.module')
          .then(module => module.UniversitiesModule),
      },
      {
        path: 'housings', loadChildren: () => import('./housings/housings.module')
          .then(module => module.HousingsModule),
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
