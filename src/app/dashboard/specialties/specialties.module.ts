import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FiltersModule } from '@app/shared/filters/filters.module';
import { ListModule } from '@app/shared/list/list.module';
import { LoadImageModule } from '@app/shared/load-image/load-image.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { SPECIALTIES_FILTER_CONFIG } from '@const/filters';
import { InViewportModule } from 'ng-in-viewport';
import { SpecialtiesRoutingModule } from 'src/app/dashboard/specialties/specialties-routing.module';
import { SpecialtiesComponent } from 'src/app/dashboard/specialties/specialties.component';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';
import { SpecialtiesInfoComponent } from './specialties-info/specialties-info.component';
import { SpecialtyEntityComponent } from './specialty/specialty-entity/specialty-entity.component';
import { SpecialtyThemesComponent } from './specialty/specialty-themes/specialty-themes.component';
import { SpecialtyComponent } from './specialty/specialty.component';


@NgModule({
  declarations: [
    SpecialtiesComponent,
    SpecialtiesInfoComponent,
    SpecialtyComponent,
    SpecialtyEntityComponent,
    SpecialtyThemesComponent,
  ],
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
    LoadImageModule,
    ListModule,
  ],
  providers: [
    {provide: FILTER_CONFIG, useValue: SPECIALTIES_FILTER_CONFIG},
  ],
})
export class SpecialtiesModule {}
