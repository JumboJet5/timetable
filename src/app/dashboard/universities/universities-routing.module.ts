import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversitiesComponent } from '@app/dashboard/universities/universities.component';
import { UniversityComponent } from '@app/dashboard/universities/university/university.component';


const routes: Routes = [
  {path: ':id', component: UniversityComponent},
  {path: '', component: UniversitiesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversitiesRoutingModule {}
