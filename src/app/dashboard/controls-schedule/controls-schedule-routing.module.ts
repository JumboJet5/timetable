import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlsScheduleComponent } from '@app/dashboard/controls-schedule/controls-schedule.component';
import { SemestersControlsComponent } from '@app/dashboard/controls-schedule/semesters-controls/semesters-controls.component';
import { StructureFiltersComponent } from '@app/shared/filters/structure-filter/structure-filters.component';


const routes: Routes = [
  {
    path: '', component: ControlsScheduleComponent, children: [
      {path: '', component: SemestersControlsComponent},
      {path: '', outlet: 'filter', component: StructureFiltersComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlsScheduleRoutingModule {}
