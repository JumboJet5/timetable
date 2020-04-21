import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccordionModule } from '@app/shared/accordion/accordion.module';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseComponent } from './course/course.component';
import { CourseEntityComponent } from './course/course-entity/course-entity.component';
import { CourseThemesComponent } from './course/course-themes/course-themes.component';


@NgModule({
  declarations: [CourseComponent, CourseEntityComponent, CourseThemesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AccordionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MenuSelectModule,
  ],
})
export class CoursesModule { }
