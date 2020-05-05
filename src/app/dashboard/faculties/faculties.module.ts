import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccordionModule } from '@app/shared/accordion/accordion.module';
import { FiltersModule } from '@app/shared/filters/filters.module';
import { ListModule } from '@app/shared/list/list.module';
import { LoadImageModule } from '@app/shared/load-image/load-image.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';
import { SmartEntitiesModule } from '@app/shared/smart-entities/smart-entities.module';
import { UNIVERSITIES_FILTER_CONFIG } from '@const/filters';
import { FacultyLessonTimesComponent } from 'src/app/dashboard/faculties/faculty/faculty-lesson-times/faculty-lesson-times.component';
import { FILTER_CONFIG } from 'src/core/injections/filter-config.injection-token';
import { FacultiesInfoComponent } from './faculties-info/faculties-info.component';
import { FacultiesRoutingModule } from './faculties-routing.module';
import { FacultiesComponent } from './faculties.component';
import { FacultyEntityComponent } from './faculty/faculty-entity/faculty-entity.component';
import { FacultyHousingsComponent } from './faculty/faculty-housings/faculty-housings.component';
import { FacultyThemesComponent } from './faculty/faculty-themes/faculty-themes.component';
import { FacultyComponent } from './faculty/faculty.component';


@NgModule({
  declarations: [
    FacultiesComponent,
    FacultyComponent,
    FacultiesInfoComponent,
    FacultyEntityComponent,
    FacultyThemesComponent,
    FacultyHousingsComponent,
    FacultyLessonTimesComponent,
  ],
  imports: [
    CommonModule,
    FiltersModule,
    FacultiesRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    ListModule,
    AccordionModule,
    MatProgressSpinnerModule,
    MenuSelectModule,
    LoadImageModule,
    MatCheckboxModule,
    SmartEntitiesModule,
  ],
  providers: [
    {provide: FILTER_CONFIG, useValue: UNIVERSITIES_FILTER_CONFIG},
  ],
})
export class FacultiesModule {}
