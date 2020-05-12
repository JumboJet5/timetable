import { Component, Optional } from '@angular/core';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Component({
  selector: 'app-faculties-list',
  templateUrl: './faculties-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './faculties-list.component.scss'],
})
export class FacultiesListComponent extends ItemsListComponent<IFaculty> {
  public emptyListMessage = 'Список факультетів пустий';

  constructor(private _facultyService: FacultyService,
              protected _popupService: PopupService,
              @Optional() public smartDetailsService: SmartDetailsService) {
    super(itemServiceFactory<IFaculty>(params => this._facultyService.getFaculties(params),
      id => this._facultyService.deleteFaculty(id)), _popupService, smartDetailsService);
  }

  public getItemDetailsEntity(entity: IFaculty): void {
    if (!!this.smartDetailsService) this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.FACULTY};
  }
}
