import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccordionModule } from '@app/shared/accordion/accordion.module';
import { ListModule } from '@app/shared/list/list.module';
import { LoadImageModule } from '@app/shared/load-image/load-image.module';
import { SmartEntitiesModule } from '@app/shared/smart-entities/smart-entities.module';
import { UniversityHousingsComponent } from 'src/app/dashboard/universities/university/university-housings/university-housings.component';
import { UniversitiesRoutingModule } from './universities-routing.module';
import { UniversitiesComponent } from './universities.component';
import { UniversityEntityComponent } from './university/university-entity/university-entity.component';
import { UniversityYearsComponent } from './university/university-years/university-years.component';
import { UniversityComponent } from './university/university.component';


@NgModule({
  declarations: [
    UniversitiesComponent,
    UniversityComponent,
    UniversityEntityComponent,
    UniversityHousingsComponent,
    UniversityYearsComponent,
  ],
  imports: [
    CommonModule,
    UniversitiesRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ListModule,
    MatProgressSpinnerModule,
    LoadImageModule,
    AccordionModule,
    SmartEntitiesModule,
  ],
})
export class UniversitiesModule {}
