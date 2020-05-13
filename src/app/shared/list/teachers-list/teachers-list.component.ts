import { Component, Optional } from '@angular/core';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { TeacherService } from '@app/service/teacher/teacher.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { teacherDegreesMap } from '@const/collections';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { ITeacher } from 'src/core/interfaces/teacher.interface';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './teachers-list.component.scss'],
})
export class TeachersListComponent extends ItemsListComponent<ITeacher> {
  public degreeMap = teacherDegreesMap();
  public emptyListMessage = 'Список викладачів пустий';
  protected _filters: IFilterParams = {ordering: 'last_name'};

  constructor(private _teacherService: TeacherService,
              protected _popupService: PopupService,
              @Optional() public smartDetailsService: SmartDetailsService) {
    super(itemServiceFactory<ITeacher>(params => this._teacherService.getItems(params),
      id => this._teacherService.deleteItem(id)), _popupService, smartDetailsService);
  }

  public getItemDetailsEntity(entity: ITeacher): void {
    if (!!this.smartDetailsService) this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.TEACHER};
  }
}
