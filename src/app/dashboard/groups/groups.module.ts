import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GroupsInfoComponent } from '@app/dashboard/groups/groups-info/groups-info.component';
import { FiltersModule } from '@app/shared/filters/filters.module';
import { ListModule } from '@app/shared/list/list.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { GROUPS_FILTER_CONFIG } from '@const/filters';
import { InViewportModule } from 'ng-in-viewport';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';
import { GroupEntityComponent } from './group/group-entity/group-entity.component';
import { GroupSemestersDetailsComponent } from './group/group-semesters-details/group-semesters-details.component';
import { GroupsemesterDetailsComponent } from './group/group-semesters-details/groupsemester-details/groupsemester-details.component';
import { GroupComponent } from './group/group.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';


@NgModule({
  declarations: [
    GroupsComponent,
    GroupsInfoComponent,
    GroupComponent,
    GroupEntityComponent,
    GroupSemestersDetailsComponent,
    GroupsemesterDetailsComponent,
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    InViewportModule,
    MenuSelectModule,
    FiltersModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ListModule,
  ],
  providers: [
    {provide: FILTER_CONFIG, useValue: GROUPS_FILTER_CONFIG},
  ],
})
export class GroupsModule {}
