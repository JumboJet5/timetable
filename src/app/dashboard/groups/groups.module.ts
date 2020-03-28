import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { InViewportModule } from 'ng-in-viewport';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupListFilterComponent } from './group-list-filter/group-list-filter.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupComponent } from './group/group.component';
import { GroupEntityComponent } from './group/group-entity/group-entity.component';
import { GroupSemestersDetailsComponent } from './group/group-semesters-details/group-semesters-details.component';


@NgModule({
  declarations: [
    GroupsComponent,
    GroupListFilterComponent,
    GroupsListComponent,
    GroupComponent,
    GroupEntityComponent,
    GroupSemestersDetailsComponent,
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    InViewportModule,
    MenuSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class GroupsModule { }
