import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialtiesInfoComponent } from '@app/dashboard/specialties/specialties-info/specialties-info.component';
import { SpecialtiesComponent } from '@app/dashboard/specialties/specialties.component';
import { SpecialtyComponent } from '@app/dashboard/specialties/specialty/specialty.component';
import { StructureFiltersComponent } from '@app/shared/filters/structure-filter/structure-filters.component';


const routes: Routes = [
  {path: ':id', component: SpecialtyComponent},
  {
    path: '', component: SpecialtiesComponent, children: [
      {path: '', component: SpecialtiesInfoComponent},
      {path: '', outlet: 'filter', component: StructureFiltersComponent},
    ],
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialtiesRoutingModule {}
