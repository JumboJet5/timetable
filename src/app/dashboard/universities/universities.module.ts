import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccordionModule } from '@app/shared/accordion/accordion.module';
import { ListModule } from '@app/shared/list/list.module';
import { LoadImageModule } from '@app/shared/load-image/load-image.module';
import { UniversitiesRoutingModule } from './universities-routing.module';
import { UniversitiesComponent } from './universities.component';
import { UniversityComponent } from './university/university.component';
import { UniversityEntityComponent } from './university/university-entity/university-entity.component';
import { UniversityHousingsComponent } from 'src/app/dashboard/universities/university/university-housings/university-housings.component';


@NgModule({
  declarations: [UniversitiesComponent, UniversityComponent, UniversityEntityComponent, UniversityHousingsComponent],
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
  ],
})
export class UniversitiesModule {}
