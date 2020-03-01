import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { InViewportModule } from 'ng-in-viewport';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupListFilterComponent } from './group-list-filter/group-list-filter.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupComponent } from './group/group.component';


@NgModule({
  declarations: [GroupsComponent, GroupListFilterComponent, GroupsListComponent, GroupComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    InViewportModule,
    MenuSelectModule,
    ReactiveFormsModule,
  ],
})
export class GroupsModule { }
