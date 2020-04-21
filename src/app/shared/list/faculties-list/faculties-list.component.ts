import { Component } from '@angular/core';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { PopupService } from '@app/service/modal/popup.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Component({
  selector: 'app-faculties-list',
  templateUrl: './faculties-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './faculties-list.component.scss'],
})
export class FacultiesListComponent extends ItemsListComponent<IFaculty> {
  constructor(private _facultyService: FacultyService,
              protected _popupService: PopupService) {
    super(itemServiceFactory<IFaculty>(params => this._facultyService.getFaculties(params),
      id => this._facultyService.deleteFaculty(id)), _popupService);
  }
}
