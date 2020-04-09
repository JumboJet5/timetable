import { Component } from '@angular/core';
import { PopupService } from '@app/service/modal/popup.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialties-list',
  templateUrl: './specialties-list.component.html',
  styleUrls: ['./specialties-list.component.scss'],
})
export class SpecialtiesListComponent extends ItemsListComponent<ISpecialty> {
  constructor(private _specialtyService: SpecialtyService,
              protected _popupService: PopupService) {
    super(itemServiceFactory<ISpecialty>(params => this._specialtyService.getSpecialties(params),
      id => this._specialtyService.deleteSpecialty(id)), _popupService);
  }
}
