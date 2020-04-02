import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { IGroup } from '@interfaces';
import { GroupService } from 'src/app/service/group/group.service';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';


@Component({
  selector: 'app-group-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class GroupSelectComponent extends AsyncSelectorWithFiltersComponent<IGroup> {
  @Input() public optionIdKey: keyof IGroup = 'slug';

  constructor(public groupService: GroupService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<IGroup>(id => groupService.getGroup(id),
      params => groupService.getGroups(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть групу';
    this.multiplePlaceholder = 'Оберіть групи';
    this.withSearch = true;
  }
}
