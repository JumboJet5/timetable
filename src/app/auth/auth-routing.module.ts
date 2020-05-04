import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedGuard } from '@app/guards/unauthorized/unauthorized.guard';
import { LoginComponent } from 'src/app/auth/login/login.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [UnauthorizedGuard]},
  {path: '', pathMatch: 'full', redirectTo: '/authentication/login'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
