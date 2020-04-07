import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FiltersModule } from '@app/shared/filters/filters.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { SPECIALTIES_FILTER_CONFIG } from '@const/filters';
import { InViewportModule } from 'ng-in-viewport';
import { SpecialtiesRoutingModule } from 'src/app/dashboard/specialties/specialties-routing.module';
import { SpecialtiesComponent } from 'src/app/dashboard/specialties/specialties.component';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';
import { SpecialtiesInfoComponent } from './specialties-info/specialties-info.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { SpecialtiesListComponent } from './specialties-info/specialties-list/specialties-list.component';
import { SpecialtyEntityComponent } from './specialty/specialty-entity/specialty-entity.component';


@NgModule({
  declarations: [SpecialtiesComponent, SpecialtiesInfoComponent, SpecialtyComponent, SpecialtiesListComponent, SpecialtyEntityComponent],
  imports: [
    CommonModule,
    FiltersModule,
    SpecialtiesRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    InViewportModule,
    MenuSelectModule,
  ],
  providers: [
    {provide: FILTER_CONFIG, useValue: SPECIALTIES_FILTER_CONFIG},
  ],
})
export class SpecialtiesModule {}
