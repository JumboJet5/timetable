import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureFiltersComponent } from '@app/shared/filters/structure-filter/structure-filters.component';
import { GroupComponent } from '@app/dashboard/groups/group/group.component';
import { GroupsInfoComponent } from '@app/dashboard/groups/groups-info/groups-info.component';
import { GroupsComponent } from '@app/dashboard/groups/groups.component';


const routes: Routes = [
  {path: ':groupSlug', component: GroupComponent},
  {
    path: '', component: GroupsComponent, children: [
      {path: '', component: GroupsInfoComponent},
      {path: '', outlet: 'filter', component: StructureFiltersComponent},
    ],
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
