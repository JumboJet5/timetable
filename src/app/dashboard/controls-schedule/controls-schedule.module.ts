import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FiltersModule } from '@app/shared/filters/filters.module';
import { ListModule } from '@app/shared/list/list.module';
import { SmartEntitiesModule } from '@app/shared/smart-entities/smart-entities.module';
import { GROUPS_FILTER_CONFIG } from '@const/filters';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';

import { ControlsScheduleRoutingModule } from './controls-schedule-routing.module';
import { ControlsScheduleComponent } from './controls-schedule.component';
import { SemestersControlsComponent } from './semesters-controls/semesters-controls.component';
import { EnabledSemestersComponent } from './semesters-controls/enabled-semesters/enabled-semesters.component';


@NgModule({
  declarations: [ControlsScheduleComponent, SemestersControlsComponent, EnabledSemestersComponent],
  imports: [
    CommonModule,
    FiltersModule,
    ControlsScheduleRoutingModule,
    ListModule,
    MatIconModule,
    MatButtonModule,
    SmartEntitiesModule,
  ],
  providers: [
    {provide: FILTER_CONFIG, useValue: GROUPS_FILTER_CONFIG},
  ],
})
export class ControlsScheduleModule {}
