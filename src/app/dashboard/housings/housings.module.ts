import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HousingsComponent } from '@app/dashboard/housings/housings.component';
import { AccordionModule } from '@app/shared/accordion/accordion.module';
import { FiltersModule } from '@app/shared/filters/filters.module';
import { ListModule } from '@app/shared/list/list.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { SmartEntitiesModule } from '@app/shared/smart-entities/smart-entities.module';
import { FACULTIES_FILTER_CONFIG } from '@const/filters';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';

import { HousingsRoutingModule } from './housings-routing.module';
import { HousingsInfoComponent } from './housings-info/housings-info.component';
import { HousingComponent } from './housing/housing.component';
import { HousingEntityComponent } from './housing/housing-entity/housing-entity.component';


@NgModule({
  declarations: [
    HousingsComponent,
    HousingsInfoComponent,
    HousingComponent,
    HousingEntityComponent,
  ],
  imports: [
    CommonModule,
    FiltersModule,
    HousingsRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    ListModule,
    MatButtonModule,
    SmartEntitiesModule,
    MatProgressSpinnerModule,
    AccordionModule,
    MenuSelectModule,
  ],
  providers: [
    {provide: FILTER_CONFIG, useValue: FACULTIES_FILTER_CONFIG},
  ],
})
export class HousingsModule {}
