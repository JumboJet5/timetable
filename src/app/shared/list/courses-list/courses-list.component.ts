import { Component, Optional } from '@angular/core';
import { CourseService } from '@app/service/course/course.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { itemServiceFactory, ItemsListComponent } from '@app/shared/list/items-list/items-list.component';
import { degreeMap } from '@const/collections';
import { ICourse } from 'src/core/interfaces/course.interface';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['../../../../core/stylesheet/items-list.scss', './courses-list.component.scss'],
})
export class CoursesListComponent extends ItemsListComponent<ICourse> {
  public degreeMap = degreeMap();

  constructor(private _courseService: CourseService,
              protected _popupService: PopupService,
              @Optional() public smartDetailsService: SmartDetailsService) {
    super(itemServiceFactory<ICourse>(params => this._courseService.getCourses(params),
      id => this._courseService.deleteCourse(id)), _popupService, smartDetailsService);
  }

  public getItemDetailsEntity(entity: ICourse): void {
    if (!!this.smartDetailsService) this.smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.COURSE};
  }
}
