import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { GroupsListComponent } from '@app/shared/list/groups-list/groups-list.component';
import { SpecialtiesListComponent } from '@app/shared/list/specialties-list/specialties-list.component';
import { InViewportModule } from 'ng-in-viewport';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { FacultiesListComponent } from './faculties-list/faculties-list.component';
import { UniversitiesListComponent } from 'src/app/shared/list/univs-list/universities-list.component';
import { HousingsListComponent } from 'src/app/shared/list/housing-list/housings-list.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';


@NgModule({
  declarations: [
    GroupsListComponent,
    SpecialtiesListComponent,
    CoursesListComponent,
    FacultiesListComponent,
    UniversitiesListComponent,
    HousingsListComponent,
    RoomsListComponent,
    TeachersListComponent,
  ],
  exports: [
    GroupsListComponent,
    SpecialtiesListComponent,
    CoursesListComponent,
    FacultiesListComponent,
    UniversitiesListComponent,
    HousingsListComponent,
    RoomsListComponent,
    TeachersListComponent,
  ],
  imports: [
    CommonModule,
    InViewportModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ListModule {}
