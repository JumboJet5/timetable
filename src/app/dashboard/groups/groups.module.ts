import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GroupsInfoComponent } from '@app/dashboard/groups/groups-info/groups-info.component';
import { DatePickerModule } from '@app/shared/date-picker/date-picker.module';
import { FiltersModule } from '@app/shared/filters/filters.module';
import { ListModule } from '@app/shared/list/list.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { SmartEntitiesModule } from '@app/shared/smart-entities/smart-entities.module';
import { SPECIALTIES_FILTER_CONFIG } from '@const/filters';
import { InViewportModule } from 'ng-in-viewport';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';
import { GroupEntityComponent } from './group/group-entity/group-entity.component';
import { GroupSemestersDetailsComponent } from './group/group-semesters-details/group-semesters-details.component';
import { GroupsemesterDetailsComponent } from './group/group-semesters-details/groupsemester-details/groupsemester-details.component';
import {
  GroupsemesterLessonTimesComponent
} from './group/group-semesters-details/groupsemester-details/groupsemester-lesson-times/groupsemester-lesson-times.component';
import {
  GroupsemesterThemesComponent
} from './group/group-semesters-details/groupsemester-details/groupsemester-themes/groupsemester-themes.component';
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
    GroupsemesterThemesComponent,
    GroupsemesterLessonTimesComponent,
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
    DatePickerModule,
    SmartEntitiesModule,
  ],
  providers: [
    {provide: FILTER_CONFIG, useValue: SPECIALTIES_FILTER_CONFIG},
  ],
})
export class GroupsModule {}
