import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeekScheduleComponent } from 'src/app/dashboard/week-schedule/week-schedule.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

const routes: Routes = [
    {path: 'dashboard/lessons-schedule/:groupSlug/:groupId', component: WeekScheduleComponent, canActivate: [AuthGuard]},
    {
        path: 'modal', outlet: 'modal', loadChildren: () => import('./modal/modal.module')
            .then(module => module.ModalModule),
    },
    {
        path: 'authentication', loadChildren: () => import('./auth/auth.module')
            .then(module => module.AuthModule),
    },
    {path: '**', pathMatch: 'full', redirectTo: '/authentication/login'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
