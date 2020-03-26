import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@environment/environment';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

const authentication = environment.production ? [] : [
  {
    path: 'authentication', loadChildren: () => import('./auth/auth.module')
      .then(module => module.AuthModule),
  },
];

const routes: Routes = [
  {
    path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module')
      .then(module => module.DashboardModule), canLoad: [AuthGuard],
  },
  ...authentication,
  {path: '**', pathMatch: 'full', redirectTo: '/dashboard/lessons-schedule/groupSlug'},
  {
    path: 'dialog', outlet: 'dialog', loadChildren: () => import('src/app/popup/dialog/dialog.module')
      .then(module => module.DialogModule),
  },
  {
    path: 'modal', outlet: 'modal', loadChildren: () => import('src/app/popup/modal/modal.module')
      .then(module => module.ModalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
