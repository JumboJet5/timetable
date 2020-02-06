import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module')
      .then(module => module.DashboardModule), canLoad: [AuthGuard]
  },
  {
    path: 'modal', outlet: 'modal', loadChildren: () => import('./modal/modal.module')
      .then(module => module.ModalModule),
  },
  {
    path: 'authentication', loadChildren: () => import('./auth/auth.module')
      .then(module => module.AuthModule),
  },
  {path: '**', pathMatch: 'full', redirectTo: '/dashboard/lessons-schedule/groupSlug/groupId'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
