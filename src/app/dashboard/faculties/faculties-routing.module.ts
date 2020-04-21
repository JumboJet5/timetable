import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultiesInfoComponent } from '@app/dashboard/faculties/faculties-info/faculties-info.component';
import { FacultiesComponent } from '@app/dashboard/faculties/faculties.component';
import { FacultyComponent } from '@app/dashboard/faculties/faculty/faculty.component';
import { StructureFiltersComponent } from '@app/shared/filters/structure-filter/structure-filters.component';


const routes: Routes = [
  {path: ':id', component: FacultyComponent},
  {
    path: '', component: FacultiesComponent, children: [
      {path: '', component: FacultiesInfoComponent},
      {path: '', outlet: 'filter', component: StructureFiltersComponent},
    ],
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacultiesRoutingModule {}
