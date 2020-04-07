import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StructureFiltersComponent } from '@app/shared/filters/structure-filter/structure-filters.component';
import { MenuSelectModule } from '@app/shared/menu-select/menu-select.module';


@NgModule({
  declarations: [StructureFiltersComponent],
  exports: [StructureFiltersComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MenuSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class FiltersModule {}
