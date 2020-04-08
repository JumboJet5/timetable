import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { GroupsListComponent } from '@app/shared/list/groups-list/groups-list.component';
import { SpecialtiesListComponent } from '@app/shared/list/specialties-list/specialties-list.component';
import { InViewportModule } from 'ng-in-viewport';
import { CoursesListComponent } from './courses-list/courses-list.component';


@NgModule({
  declarations: [
    GroupsListComponent,
    SpecialtiesListComponent,
    CoursesListComponent,
  ],
  exports: [
    GroupsListComponent,
    SpecialtiesListComponent,
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    InViewportModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
})
export class ListModule {}
