import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FiltersModule } from '@app/shared/filters/filters.module';
import { ListModule } from '@app/shared/list/list.module';
import { SmartEntitiesModule } from '@app/shared/smart-entities/smart-entities.module';
import { UNIVERSITIES_FILTER_CONFIG } from '@const/filters';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';
import { TeachersInfoComponent } from './teachers-info/teachers-info.component';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';


@NgModule({
  declarations: [TeachersInfoComponent, TeachersComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    ListModule,
    SmartEntitiesModule,
    FiltersModule,
  ],
  providers: [
    {provide: FILTER_CONFIG, useValue: UNIVERSITIES_FILTER_CONFIG},
  ],
})
export class TeachersModule {}
