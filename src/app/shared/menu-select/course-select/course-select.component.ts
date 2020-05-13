import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CourseService } from '@app/service/course/course.service';
import { FormatService } from '@app/service/format/format.service';
import { degreeMap } from '@const/collections';
import { ICourse } from 'src/core/interfaces/course.interface';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';

@Component({
  selector: 'app-course-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class CourseSelectComponent extends AsyncSelectorWithFiltersComponent<ICourse> {
  private _degreeMap = degreeMap();
  constructor(public courseService: CourseService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<ICourse>(id => courseService.getItem(id),
      params => courseService.getItems(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть курс';
    this.multiplePlaceholder = 'Оберіть курси';
  }

  public getOptionText(id: number | string) {
    const item = this._optionIdsMap.get(id);
    const degree = !!item && this._degreeMap.has(item.degree) ? this._degreeMap.get(item.degree).name : '';
    return !!item ? `${item.name} ${degree}` : '';
  }
}
