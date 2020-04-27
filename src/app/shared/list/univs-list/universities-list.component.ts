import { Component, Optional } from '@angular/core';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { UniversityService } from '@app/service/universitiy/university.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { IUniversity } from 'src/core/interfaces/university';

@Component({
  selector: 'app-universities-list',
  templateUrl: './universities-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './universities-list.component.scss'],
})
export class UniversitiesListComponent extends ItemsListComponent<IUniversity> {
  constructor(private _universityService: UniversityService,
              protected _popupService: PopupService,
              @Optional() public smartDetailsService: SmartDetailsService) {
    super(itemServiceFactory<IUniversity>(params => this._universityService.getUniversities(params),
      id => this._universityService.deleteUniversity(id)), _popupService, smartDetailsService);
  }

  public getItemDetailsEntity(entity: IUniversity): void {
    return undefined;
  }
}
