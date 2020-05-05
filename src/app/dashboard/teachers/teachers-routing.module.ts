import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersInfoComponent } from '@app/dashboard/teachers/teachers-info/teachers-info.component';
import { TeachersComponent } from '@app/dashboard/teachers/teachers.component';
import { StructureFiltersComponent } from '@app/shared/filters/structure-filter/structure-filters.component';


const routes: Routes = [
  {
    path: '', component: TeachersComponent, children: [
      {path: '', component: TeachersInfoComponent},
      {path: '', outlet: 'filter', component: StructureFiltersComponent},
    ],
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
