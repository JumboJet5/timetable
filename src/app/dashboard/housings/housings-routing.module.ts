import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingComponent } from '@app/dashboard/housings/housing/housing.component';
import { HousingsInfoComponent } from '@app/dashboard/housings/housings-info/housings-info.component';
import { HousingsComponent } from '@app/dashboard/housings/housings.component';
import { StructureFiltersComponent } from '@app/shared/filters/structure-filter/structure-filters.component';


const routes: Routes = [
  {path: ':id', component: HousingComponent},
  {
    path: '', component: HousingsComponent, children: [
      {path: '', component: HousingsInfoComponent},
      {path: '', outlet: 'filter', component: StructureFiltersComponent},
    ],
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HousingsRoutingModule {}
