import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GroupService } from 'src/app/service/group/group.service';
import { IGroup } from '@interfaces';
import { AsyncOptionsSelectComponent, optionServiceFactory } from '../loaded-options/async-options-select.component';


@Component({
  selector: 'app-group-select',
  templateUrl: '../loaded-options/async-options-select.component.html',
  styleUrls: ['../loaded-options/async-options-select.component.scss'],
  providers: [GroupService]
})
export class GroupSelectComponent extends AsyncOptionsSelectComponent<IGroup> {
  constructor(public groupService: GroupService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<IGroup>(id => groupService.getGroup(id),
      params => groupService.getGroups(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть групу';
    this.simplePlaceholder = 'Оберіть групи';
    this.withSearch = true;
  }
}
