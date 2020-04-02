import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IGroup } from '@interfaces';
import { GroupService } from 'src/app/service/group/group.service';
import { AsyncOptionsSelectComponent, optionServiceFactory } from '../async-options-select/async-options-select.component';


@Component({
  selector: 'app-group-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class GroupSelectComponent extends AsyncOptionsSelectComponent<IGroup> {
  @Input() public optionIdKey: keyof IGroup = 'slug';

  constructor(public groupService: GroupService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<IGroup>(id => groupService.getGroup(id),
      params => groupService.getGroups(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть групу';
    this.multiplePlaceholder = 'Оберіть групи';
    this.withSearch = true;
  }
}
