import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { GROUPS_FILTER_CONFIG } from '@const/filters';
import { InViewportModule } from 'ng-in-viewport';
import { ListFilterComponent } from 'src/app/dashboard/groups/group-list-filter/list-filter.component';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';
import { GroupEntityComponent } from './group/group-entity/group-entity.component';
import { GroupSemestersDetailsComponent } from './group/group-semesters-details/group-semesters-details.component';
import { GroupsemesterDetailsComponent } from './group/group-semesters-details/groupsemester-details/groupsemester-details.component';
import { GroupComponent } from './group/group.component';
import { GroupsInfoComponent } from '@app/dashboard/groups/groups-info/groups-info.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupsListComponent } from '@app/dashboard/groups/groups-info/groups-list/groups-list.component';


@NgModule({
  declarations: [
    GroupsComponent,
    ListFilterComponent,
    GroupsInfoComponent,
    GroupComponent,
    GroupEntityComponent,
    GroupSemestersDetailsComponent,
    GroupsemesterDetailsComponent,
    GroupsListComponent,
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    InViewportModule,
    MenuSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {provide: FILTER_CONFIG, useValue: GROUPS_FILTER_CONFIG},
  ],
})
export class GroupsModule {}
