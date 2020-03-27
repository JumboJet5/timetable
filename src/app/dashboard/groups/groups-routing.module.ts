import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListFilterComponent } from '@app/dashboard/groups/group-list-filter/group-list-filter.component';
import { GroupComponent } from '@app/dashboard/groups/group/group.component';
import { GroupsListComponent } from '@app/dashboard/groups/groups-list/groups-list.component';
import { GroupsComponent } from '@app/dashboard/groups/groups.component';


const routes: Routes = [
  {path: 'details/:groupSlug', component: GroupComponent},
  {
    path: '', component: GroupsComponent, children: [
      {path: '', component: GroupsListComponent},
      {path: '', outlet: 'filter', component: GroupListFilterComponent},
    ],
  },
  {
    path: ':univ/:faculty/:specialty/:course', component: GroupsComponent, children: [
      {path: '', component: GroupsListComponent},
      {path: '', outlet: 'filter', component: GroupListFilterComponent},
    ],
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
